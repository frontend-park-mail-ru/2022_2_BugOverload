export class Component {
    constructor(props) {
        this.state = {};
        this.props = props || {};
        if (Object.hasOwnProperty.call(props, 'rootNode')) {
            this.rootNode = props.rootNode;
        }
    }
}
