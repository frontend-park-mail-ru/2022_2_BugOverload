import template from '@components/AboutFilm/aboutFilm.handlebars';
import { SaveToCollectionMenu } from '@components/SaveToCollectionMenu/saveToCollectionMenu.js';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';

export class AboutFilm extends Component {
    constructor(data) {
        super();
        this.data = data;
    }

    getTemplate() {
        return template(this.data);
    }

    componentDidMount() {
        const buttonPlus = document.querySelector('.js-btn-save-to-coll');
        if (!buttonPlus) {
            return;
        }

        const menu = new SaveToCollectionMenu();
        //     [
        //     {
        //         coll_name: 'Избранное',
        //     },
        //     {
        //         coll_name: 'Топчик',
        //         isUsed: 'true',
        //     },
        //     {
        //         coll_name: 'Друг посоветовал',
        //     },
        // ]

        buttonPlus.addEventListener('click', (e) => {
            e.preventDefault();
            if (!store.getState('user')) {
                ShowErrorMessage('Вы должны быть авторизованы');
                return;
            }
            menu.open.apply(menu);
        });

        const buttonBookmark = document.querySelector('.js-btn-save-to-bookmark');
        if (!buttonBookmark) {
            return;
        }
        buttonBookmark.addEventListener('click', (e) => {
            e.preventDefault();
            if (!store.getState('user')) {
                ShowErrorMessage('Вы должны быть авторизованы');
                return;
            }
            ShowErrorMessage('Сохранение в Избранное пока не доступно'); // TODO
        });

        const buttonTrailer = document.querySelector('.js-btn-watch-trailer');
        if (!buttonBookmark) {
            return;
        }
        buttonTrailer.addEventListener('click', (e) => {
            e.preventDefault();
            ShowErrorMessage('Просмотр трейлера пока не доступен'); // TODO
        });
    }
}
