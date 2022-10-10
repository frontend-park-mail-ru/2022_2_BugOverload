import { MainView } from './views/MainPage/mainPage.js';

const root = document.body.querySelector('.root');
const main = new MainView(root);
main.render();
