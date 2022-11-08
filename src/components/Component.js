import { ROOT } from '@config/config.js';

export class Component {
    /**
     * Cохраняет переданные параметры props.
     * @param {Object} - необходимые для работы класса свойства
     * @default {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props = { rootNode: ROOT }) {
        this.state = {};
        this.props = props;
        if (Object.hasOwnProperty.call(props, 'rootNode')) {
            this.rootNode = props.rootNode;
        }
    }
}
