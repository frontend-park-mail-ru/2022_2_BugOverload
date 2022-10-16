import { Router } from './router/Router.js';
import { subscribe } from './store/subscribeDispatcher.js';

subscribe();
const rout = new Router(document.getElementById('root'));
rout.start();
