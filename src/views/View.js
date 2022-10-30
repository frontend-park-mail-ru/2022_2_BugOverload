import { Header } from '@components/Header/header.js';
import { Component } from '@components/Component.js';

/**
* Базовый класс View
*
*/
export class View extends Component {
    render() {
        if(!document.body.querySelector('.header')) {
            const header = new Header({ rootNode: this.rootNode });
            header.render();
        }
    }
}
