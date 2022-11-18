import { header } from '@components/Header/header';
import { Component } from '@components/Component';

/**
* Базовый класс View
*
*/
export class View extends Component {
    render(id = null as number) {
        if (!document.body.querySelector('.js-header')) {
            header.render();
        }
    }
}
