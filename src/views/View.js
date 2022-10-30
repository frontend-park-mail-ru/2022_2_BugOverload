import { Header } from '@components/Header/header.js';
import { Component } from '@components/Component.js';
// import { ROOT } from '@config/config.js';

export class View extends Component {
    render() {
        const header = new Header({ rootNode: this.rootNode });
        header.render();
        header.componentDidMount();
    }
}
