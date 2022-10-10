import { renderMainPage } from './views/MainPage/mainPage.js';
import { Router } from './router/Router.js';

const rout = new Router(document.getElementById('root'));

rout.register('/', renderMainPage);
rout.go({path: '/'});
