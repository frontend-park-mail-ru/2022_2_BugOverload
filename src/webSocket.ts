import { API } from '@config/config';
import { showNotification } from '@components/Notification/notification';

interface wsMessage {
    action: string,
    payload: anyObject,
}

interface Callback {
    (payload: anyObject): void;
}

class WebSocketService {
    private _ws:WebSocket;
    private mapActionHandlers: Map<string, Callback>;
    private openHandler: EventListener;
    private messageHadnler: EventListener;
    private errorHandler: EventListener;
    private closeHandler: EventListener;

    constructor (url: string = API.ws) {
        this._ws = new WebSocket(url);
        this.mapActionHandlers = new Map();

        this.subscribe('ANONS_FILM', (payload: filmNotifPayload) => {
            showNotification('ANONS_FILM', payload);
        });
    }

    initialize() {
        this.openHandler = () => {
            this.send('message',{ msg: 'Hello!' });
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
        this._ws.removeEventListener('open', this.openHandler);
        this._ws.removeEventListener('message', this.messageHadnler);
        this._ws.removeEventListener('error', this.errorHandler);
        this._ws.removeEventListener('close', this.closeHandler);
    }
}

export const webSocket = new WebSocketService(API.ws);
