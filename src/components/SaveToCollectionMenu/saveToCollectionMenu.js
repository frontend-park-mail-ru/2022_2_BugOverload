import template from '@components/SaveToCollectionMenu/saveToCollectionMenu.handlebars';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';

export class SaveToCollectionMenu extends Component {
    constructor(collections = [
        { coll_name: 'Буду смотреть' },
        {
            coll_name: 'Избранное',
            isUsed: 'true',
        }]) {
        super();
        this.state.collections = collections;
        this.placeholder = document.querySelector('.js-place-save-to-collection');
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.js-place-save-to-collection')) {
                this.close();
            }
        });
        store.subscribe('listCollections', () => {
            this.state.collections = store.getState('listCollections');
        });
    }

    open() {
        if (!this.placeholder) {
            return;
        }
        let menu = this.placeholder.querySelector('.js-menu-save__container');
        if (menu && menu.hasAttribute('open')) {
            this.close();
            return;
        }
        this.render();
        menu = this.placeholder.querySelector('.js-menu-save__container');
        menu.setAttribute('open', '');
    }

    close() {
        if (!this.placeholder) {
            return;
        }

        const menu = this.placeholder.querySelector('.js-menu-save__container');
        if (menu) {
            menu.remove();
        }
    }

    getTemplate() {
        return template({ collections: this.state.collections });
    }

    render() {
        this.placeholder.insertAdjacentHTML('beforeend', this.getTemplate());
    }
}
