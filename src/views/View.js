import { Header } from '@components/Header/header.js';
import { Component } from '@components/Component.js';

/**
* Базовый класс View
*
*/
export class View extends Component {
    render() {
        const header = new Header({ rootNode: this.rootNode });
        header.render();
    }
}
