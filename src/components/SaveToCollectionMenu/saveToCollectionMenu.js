import template from '@components/SaveToCollectionMenu/saveToCollectionMenu.handlebars';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { ShowMessage } from '@components/Message/message.js';

/**
* Отражает меню со списком имеющихся коллеций у пользователя
* Подписывается на измнение state listCollectionsUser
*/
export class SaveToCollectionMenu extends Component {
    constructor(nameLocation) {
        super();
        this.state.collections = null;
        this.placeholder = this.rootNode.querySelector(`.${nameLocation}`);

        // Навешиваем обработчик на выход по клику вне области меню
        document.addEventListener('click', (e) => {
            if (!e.target.closest(`.${nameLocation}`)) {
                this.close();
            }
        });
        store.subscribe('listCollectionsUser', () => {
            this.state.collections = store.getState('listCollectionsUser');
        });
    }

    /**
     * Обработчик открытия меню
     *
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
            this.componentWillUnmount();
            menu.remove();
        }
    }

    /**
     * Отрисовывает компонент, используя location и hbs-template.
     */
    render() {
        this.placeholder.insertAdjacentHTML('beforeend', template({ collections: this.state.collections }));
        this.componentDidMount();
    }

    /**
     * Навешивает обработчики на добаление в коллекцию
     */
    componentDidMount() {
        const btns = this.placeholder.querySelectorAll('.js-menu-save__item-btn');
        btns.forEach((button) => {
            this[`${button.dataset.name}`] = (event) => {
                event.preventDefault();
                ShowMessage(`Коллекция ${button.dataset.name} в данный момент не доступна`, 'negative');
            };
            button.addEventListener('click', this[`${button.dataset.name}`]);
        });
    }

    /**
     * Освобождает ресурсы удалением обработчиков
     */
    componentWillUnmount() {
        const btns = this.placeholder.querySelectorAll('.js-menu-save__item-btn');
        btns.forEach((button) => {
            button.removeEventListener('click', this[`${button.dataset.name}`]);
        });
    }
}
