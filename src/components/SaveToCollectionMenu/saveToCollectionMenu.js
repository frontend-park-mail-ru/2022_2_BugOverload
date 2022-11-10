import template from '@components/SaveToCollectionMenu/saveToCollectionMenu.handlebars';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';

/**
* Отражает меню со списком имеющихся коллеций у пользователя
* Подписывается на измнение state listCollections
*/
export class SaveToCollectionMenu extends Component {
    constructor(collections = [
        { name_collection: 'Буду смотреть' },
        {
            name_collection: 'Избранное',
            is_used: 'true',
        }]) {
        super();
        this.state.collections = collections;
        this.placeholder = this.rootNode.querySelector('.js-place-save-to-collection');

        // Навешиваем обработчик на выход по клику вне области меню
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.js-place-save-to-collection')) {
                this.close();
            }
        });
        store.subscribe('listCollections', () => {
            this.state.collections = store.getState('listCollections');
        });
    }

    /**
     * Обработчик открытия меню
     */
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

    /**
     * Обработчик закрытия меню
     */
    close() {
        if (!this.placeholder) {
            return;
        }

        const menu = this.placeholder.querySelector('.js-menu-save__container');
        if (menu) {
            menu.remove();
        }
    }

    /**
     * Отрисовывает компонент, используя location и hbs-template.
     */
    render() {
        this.placeholder.insertAdjacentHTML('beforeend', template({ collections: this.state.collections }));
    }
}
