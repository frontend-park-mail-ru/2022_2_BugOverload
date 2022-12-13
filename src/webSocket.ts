import { API } from '@config/config';

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

        this.subscribe('message', (payload) => console.log(`EMITTED: ${JSON.stringify(payload)}`))
        // this.subscribe('message', (payload) => {
        //     console.log(`AAAAAAAA infinity: ${JSON.stringify(payload)}`);
        //     this.send('message', payload);
        // });
    }

    initialize() {
        this.openHandler = () => {
            console.log('success open WS!');
            this.send('message',{ msg: 'Hello!' });
        };
        this._ws.addEventListener('open', this.openHandler);

        this.messageHadnler = (event: MessageEvent<any>) => {
            const data: wsMessage = JSON.parse(event.data)
            console.log(`get MESSAGE: type: ${data.action}, payload: ${JSON.stringify(data.payload)}`);
            this.emit([data.action], data.payload);
        };
        this._ws.addEventListener('message', this.messageHadnler);

        this.errorHandler = (err: ErrorEvent) => {
            console.log(`get error. Reason: ${err.message}`);
        };
        this._ws.addEventListener('error', this.errorHandler);

        this.closeHandler = (event: CloseEvent) => {
            console.log(`success close! code: ${event.code}, reason: ${event.reason}`);
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

export const webSocket = new WebSocketService('ws://localhost:3001'); // test
