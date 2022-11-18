import * as template from '@router/Page404/page404.handlebars';
import { store } from '@store/Store.js';
import { Component } from '@components/Component.js';

export const render404 = () => {
    const root = document.getElementById('root');
    root.replaceChildren();
    root.insertAdjacentHTML('afterbegin', template());
};

export interface NotFoundPage {
    state :{notFound :string};
}

export class NotFoundPage extends Component {
    constructor(props :any) {
        super(props);

        this.state = {
            notFound: null,
        };

        this.notFoundPageSubscribe = this.notFoundPageSubscribe.bind(this);
        store.subscribe('notFound', this.notFoundPageSubscribe);
    }

    notFoundPageSubscribe() {
        this.state.notFound = store.getState('notFound');
        this.render();
    }

    render = () => {
        const root = document.getElementById('root');
        root.replaceChildren();
        root.insertAdjacentHTML('afterbegin', template());
    };
}

export const notFoundPage = new NotFoundPage({ rootNode: document.getElementById('root') });
