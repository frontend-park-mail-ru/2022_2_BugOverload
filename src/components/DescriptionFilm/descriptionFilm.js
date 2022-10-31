import template from '@components/DescriptionFilm/descriptionFilm.handlebars';
import { Component } from '@components/Component.js';

export class DescriptionFilm extends Component {
    constructor(text = '') {
        super();
        this.text = text;
        this.location = document.querySelector('.js-film-page__description');
        // this.state = {
        //     descriptionIsActive: null,
        // };
        // store.subscribe('descriptionIsActive', () => {
        //     debugger;
        //     if (store.getState('descriptionIsActive')) {
        //         // this.rootNode.querySelector('.header').remove();
        //         this.location.insertAdjacentHTML('afterbegin', template({ text: this.text }));
        //     } else {
        //         this.location.innerHTML = ''; //TODO
        //     }
        // });
        // debugger;
        // console.log(store.mapActionHandlers);
        // console.log(store.mapSubscribers);
    }

    render() {
        if (!this.location) {
            return;
        }

        this.isActive = true;
        this.location.insertAdjacentHTML('afterbegin', template({ text: this.text }));
    }

    remove() {
        if (!this.location) {
            return;
        }

        if (this.isActive) {
            this.location.innerHTML = '';
        }

        this.isActive = false;
    }
}
