import { ROOT } from '@config/config.js';

export class Component {
    constructor(props = { rootNode: ROOT }) {
        this.state = {};
        this.props = props || {};
        if (Object.hasOwnProperty.call(props, 'rootNode')) {
            this.rootNode = props.rootNode;
        }
    }
}
