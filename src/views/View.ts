import { header } from '@components/Header/header';
import { Component } from '@components/Component';

/**
* Базовый класс View
*
*/
export class View extends Component {
    render(id = null as any) {
        if (!document.body.querySelector('.js-header')) {
            if(id === "search") {
                header.render(id);
            } else {
                header.render();
            }
        }
    }
}
