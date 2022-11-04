import { ROOT } from '@config/config.js';

/**
* Базовый компонент расшираемый другими
*
*/
export class Component {
    /**
     * Cохраняет props
     * @param {Object} props - устанавливает параметры компонента
     */
    constructor(props = { rootNode: ROOT }) {
        this.state = {};
        this.props = props;
        if (Object.hasOwnProperty.call(props, 'rootNode')) {
            this.rootNode = props.rootNode;
        }
    }
}
