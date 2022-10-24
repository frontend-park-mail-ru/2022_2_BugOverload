import template from '@components/AboutFilm/aboutFilm.handlebars';
import { SaveToCollectionMenu } from '@components/SaveToCollectionMenu/saveToCollectionMenu.js';

export class AboutFilm {
    constructor(data) {
        this.data = data;
    }

    getTemplate() {
        return template(this.data);
    }

    addHandlers() {
        const button = document.querySelector('.js-btn-save-to-coll');
        if (!button) {
            return;
        }

        const menu = new SaveToCollectionMenu([
            {
                coll_name: 'Избранное',
                // isUsed: 'false',
            },
            {
                coll_name: 'Топчик',
                isUsed: 'true',
            },
            {
                coll_name: 'Друг посоветовал',
                // isUsed: 'false',
            },
        ]);

        button.addEventListener('click', (e) => {
            e.preventDefault();
            menu.open.apply(menu);
        });
    }
}
