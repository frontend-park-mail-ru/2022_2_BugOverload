import { API } from '@config/config';
import { showNotification } from '@components/Notification/notification';
import { store } from '@store/Store';
import { decoreDate } from '@utils/decorationData';


interface wsMessage {
    action: string,
    payload: anyObject,
}

interface Callback {
    (payload: anyObject): void;
}

class WebSocketService {
    private _ws:WebSocket|null;
    private _wsUrl: string;
    private mapActionHandlers: Map<string, Callback>;
    private openHandler: EventListener;
    private messageHadnler: EventListener;
    private errorHandler: EventListener;
    private closeHandler: EventListener;
    private storeHandler: Function;
    private logoutHandler: Function;
    private state: {
        user: string|null,
        permission: string|null,
        isActive: boolean|null,
        logoutStatus: number|null,
    };

    constructor (url: string = API.ws) {
        this._wsUrl = url;
        this._ws = null;
        this.mapActionHandlers = new Map();

        this.state = {
            user: null,
            permission: null,
            isActive: true,
            logoutStatus: null,
        };

        this.subscribe('ANONS_FILM', (payload: filmNotifPayload) => {
            showNotification('ANONS_FILM', payload);

            if (!this.state.isActive && this.state.permission === 'granted') {
                const date = decoreDate(payload.prod_date).split(' ');
                new Notification('Премьера фильма!', {
                    body: `${payload.name} в Кино с ${date[0]} ${date[1]}`,
                })
            }
        });

        this.storeHandler = () => {
            this.state.user = store.getState('user');

            if (this.state.user) {
                this._ws = new WebSocket(this._wsUrl);

                this.initialize();

                Notification.requestPermission().then(permission => {
                    this.state.permission = permission;
                });
            }
        };

       store.subscribe('user', this.storeHandler);

        this.logoutHandler = () => {
            this.state.logoutStatus = store.getState('logoutStatus');
            if (this.state.logoutStatus) {
                this.cancel();
            }
        };
        store.subscribe('logoutStatus', this.logoutHandler);

        window.onfocus = () => this.state.isActive = true;
        window.onblur = () => this.state.isActive = false;
    }

    initialize() {
        if (!this._ws) {
            return;
        }

        this.openHandler = () => {
            console.log('open websocket');
        };
        this._ws.addEventListener('open', this.openHandler);

        this.messageHadnler = (event: MessageEvent<any>) => {
            const data: wsMessage = JSON.parse(event.data)
            this.emit([data.action], data.payload);
        };
        this._ws.addEventListener('message', this.messageHadnler);

        this.errorHandler = (err: ErrorEvent) => {
            console.log(`get error. Reason: ${err.message}`);
        };
        this._ws.addEventListener('error', this.errorHandler);

        this.closeHandler = (event: CloseEvent) => {
            console.log(`websocket success close! code: ${event.code}`);
        };
        this._ws.addEventListener('close', this.closeHandler);
    }

    send(action: string, payload: anyObject) {
        this._ws.send(JSON.stringify({
            action,
            payload,
        }));
    }

    emit(actions: string[], payload: anyObject) {
        actions.forEach((action) => this.mapActionHandlers.get(action)(payload));
    }

    subscribe(action: string, callback: Callback) {
        if (this.mapActionHandlers.has(action)) {
            return;
        }
        this.mapActionHandlers.set(action, callback);
    }

    unsubscribe(action: string) {
        if (this.mapActionHandlers.has(action)) {
            this.mapActionHandlers.delete(action);
        }
    }

    cancel() {
        if(this._ws) {
            this._ws.removeEventListener('open', this.openHandler);
            this._ws.removeEventListener('message', this.messageHadnler);
            this._ws.removeEventListener('error', this.errorHandler);
            this._ws.removeEventListener('close', this.closeHandler);
            this._ws = null;
        }

       // store.unsubscribe('user', this.storeHandler);
    }
}

export const webSocket = new WebSocketService(API.ws);
