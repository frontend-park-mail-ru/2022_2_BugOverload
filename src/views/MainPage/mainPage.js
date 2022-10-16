import { MainBody } from '../../components/MainBody/mainBody.js';
import { Header } from '../../components/Header/header.js';
import { ROOT } from '../../config/config.js';

/**
* Отрисовывает главную страницу, добавляя HTML-шаблон в root в index.html
*
*/
export function renderMainPage() {
    const header = new Header(ROOT);
    header.render();
    header.handlerHeader();

    const mainBody = new MainBody(ROOT);
    mainBody.renderMainPage();
}
