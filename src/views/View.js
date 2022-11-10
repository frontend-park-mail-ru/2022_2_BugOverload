import { header } from '@components/Header/header.js';
import { Component } from '@components/Component.js';

/**
* Базовый класс View
*
*/
export class View extends Component {
    render() {
        if (!document.body.querySelector('.js-header')) {
            header.render();
        }
    }
}
