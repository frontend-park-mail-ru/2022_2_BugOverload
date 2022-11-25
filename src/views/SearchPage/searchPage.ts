import { ROOT } from '@config/config';
import { store } from '@store/Store';
import { actionGetSearchData } from '@actions/commonActions';
import { View } from '@views/View';
import template from '@views/SearchPage/searchPage.handlebars';
import { PremiereFilm } from '@components/PremiereFilm/premiereFilm';
import { PersonMed } from '@components/PersonMed/personMed';
import { SearchList } from '@components/SearchList/searchList';


/**
* Отрисовывает главную страницу, добавляя HTML-шаблон в root в index.html
*
*/
class SearchPage extends View {
    constructor(props: componentProps) {
        super(props);
        this.state = {
            search: null,
            isSubscribed: false,
        };
    }

    render(request?: string|null) {
        const searchBody: Element = document.querySelector('.js-search-page');
        if (searchBody) {
            searchBody.remove();
        }
        console.log('first render');
        super.render();

        this.subHandler = () => {
            this.state.search = store.getState('search');
            this.render();
        }

        if (!this.state.isSubscribed) {
            store.subscribe('search', this.subHandler);
            console.log('subscribed');
            this.state.isSubscribed = true;
        }

        if (!this.state.search) {
            store.dispatch(actionGetSearchData({
                request,
            }));
            console.log('dispatched');
            return;
        }

        ROOT.insertAdjacentHTML('beforeend', template());
        console.log('tmpl');

        if ('error' in this.state.search) {
            ROOT.querySelector('.js-search-page__content-container')?.insertAdjacentHTML('beforeend', `
            <div class="search-page__no-content">
                По вашему запросу ничего не нашлось :(
                <div data-section="/" class="search-page__no-content-btn secondary-btn-med">Перейти на главную</div>
            </div>`);
        }

        if ('films' in this.state.search) {
            this.searchListFilms = new SearchList({
                itemCreator: PremiereFilm.createFilmPremiere.bind(PremiereFilm),
                nameLocation: 'js-search-page__films',
                rootNode: ROOT,
                data: this.state.search.films,
                name: 'Найденные фильмы:',
            });
            this.searchListFilms.render();
            console.log('films');
        }

        if ('serials' in this.state.search) {
            this.searchListSerials = new SearchList({
                itemCreator: PremiereFilm.createFilmPremiere.bind(PremiereFilm),
                nameLocation: 'js-search-page__serials',
                rootNode: ROOT,
                data: this.state.search.serials,
                name: 'Найденные сериалы:',
            });
            this.searchListSerials.render();
            console.log('sers');
        }

        if ('persons' in this.state.search) {
            this.searchListPerson = new SearchList({
                itemCreator: PersonMed.createPersonMed.bind(PersonMed),
                nameLocation: 'js-search-page__persons',
                rootNode: ROOT,
                data: this.state.search.persons,
                name: 'Найденные имена:',
            });
            this.searchListPerson.render();
            console.log('psns');
        }

        this.state.search = null;
        // this.isSubscribed = false;
    }

    componentWillUnmount() {
        this.isSubscribed = false;
        this.state.search = null;
        // store.unsubscribe('search', this.subHandler);
        // console.log('unsub');
    }
}

export const searchPage = new SearchPage({ rootNode: document.getElementById('root') });
