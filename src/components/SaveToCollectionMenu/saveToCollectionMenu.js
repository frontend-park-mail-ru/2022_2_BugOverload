import template from '@components/SaveToCollectionMenu/saveToCollectionMenu.handlebars';

export class SaveToCollectionMenu {
    constructor(collections) {
        this.collections = collections;
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.js-place-save-to-collection')) {
                this.close();
            }
        });
    }

    open() {
        this.placeholder = this.placeholder ? this.placeholder : document.querySelector('.js-place-save-to-collection');
        let menu = this.placeholder.querySelector('.js-menu-save__container');
        if (menu.hasAttribute('open')) {
            this.close();
            return;
        }
        this.render();
        menu = this.placeholder.querySelector('.js-menu-save__container');
        menu.setAttribute('open', '');
    }

    close() {
        const menu = this.placeholder.querySelector('.js-menu-save__container');
        menu.remove();
    }

    getTemplate() {
        return template({ collections: this.collections });
    }

    render() {
        this.placeholder.insertAdjacentHTML('beforeend', this.getTemplate());
    }
}
