import { Userbar } from '@components/Userbar/userbar';
import template from '@components/Header/header.handlebars';
import { Component } from '@components/Component';
import { store } from '@store/Store';
import { router } from '@router/Router';
import { actionAuth, actionLogout } from '@store/actionCreater/userActions';
import { isMobile } from '@/config/config';

export interface Header {
    state: {
        user: user,
    }
}

/**
* Отрисовывает хедер.
* Обращается к бэкенду для авторизации пользователя или проверки его авторизации.
* Добавляет обработчики событий.
*
*/
export class Header extends Component {
    /**
     * Cохраняет rootNode.
     * @param {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props :componentProps) {
        super(props);
        this.state = {
            user: null,
        };
        store.subscribe('user', () => {
            this.state.user = store.getState('user');
            this.render();
        });

        this.isOpenSearch = false;
    }

    /**
     * Рендерит стандартный хэдер без пользовательских данных
     */
    render( search = '', auth = true) {
        const header = this.rootNode.querySelector('.js-header');
        if (header) {
            header.remove();
        }

        this.rootNode.insertAdjacentHTML('afterbegin', template(
            Object.assign(
                { isMobile },
                this.state.user,
                { search },
            )
        ));

        const logoutButton = this.rootNode.querySelector('.js-header__mobile-userbar__link-out');
        if (this.state.user) {
            if(logoutButton) {
                if(logoutButton.classList.contains('dysplay-none')) {
                    logoutButton.classList.remove('dysplay-none');
                }
                logoutButton.classList.add('dysplay-flex');
            }

            const userbar = new Userbar({ rootNode: this.rootNode });
            userbar.componentDidMount(this.state.user);
        } else {
                if(logoutButton) {
                    if(logoutButton.classList.contains('dysplay-flex')) {
                        logoutButton.classList.remove('dysplay-flex');
                    }
                    logoutButton.classList.add('dysplay-none');
                }
                if (auth) {
                store.dispatch(actionAuth());
            }
        }

        this.componentDidMount();
    }

    componentDidMount() {
        const buttonSearch = this.rootNode.querySelector('.js-mobile-search');
        if (buttonSearch) {
            this.updateHeaderToSearch = (e: Event) => {
                e.preventDefault();
                (e.target as HTMLElement).style.display = 'none';
                const btnLogin: HTMLElement = this.rootNode.querySelector('.js-header__login__btn');
                if (btnLogin) {
                    btnLogin.style.display = 'none';
                }

                const btnTarget: HTMLElement = this.rootNode.querySelector('.js-header__menu-mobile__target');
                if (btnTarget) {
                    btnTarget.style.display = 'none';
                }

                const searchForm: HTMLElement = this.rootNode.querySelector('.js-header-search');
                if (searchForm) {
                    searchForm.style.display = 'block';
                    searchForm.children[0].classList.add('header__form__input_full');
                    searchForm.children[1].classList.add('header__form__icon-search_input-full');
                    // searchForm.children[0].classList.remove('header__form__input');
                    searchForm.classList.add('header__form_full');
                }

                this.isOpenSearch = true;
                e.stopPropagation();
            };
            buttonSearch.addEventListener('click', this.updateHeaderToSearch);

            this.comebackHeader = (e: Event) => {
                if (this.isOpenSearch && !(e.target as HTMLElement).closest('.js-header-search')) {
                    console.log('edned');
                    this.componentWillUnmount();
                    this.render('', false);
                    this.isOpenSearch = false;
                }
            };
            document.addEventListener('click', this.comebackHeader);
        }

        const form = this.rootNode.querySelector('.js-header-search');
        if (form) {

            this.submitHadndler = (e: Event) => {
                e.preventDefault();
                const request: string = (form.querySelector('.js-header__form__input') as HTMLInputElement).value;
                router.go({ path: '/search/', props: `q-${request}` }, { pushState: true, refresh: false  });
            }

            form.addEventListener('submit', this.submitHadndler);
        }

        const targetHadler = document.querySelector('.js-header__mobile-userbar__link-out');
        if (targetHadler) {
            targetHadler.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target as HTMLElement;

                if (target.dataset.section === 'logout') {
                    store.dispatch(actionLogout());
                }
            });
        }
    }

    componentWillUnmount() {
        const form = this.rootNode.querySelector('.js-header-search');
        if (!form) {
            return;
        }

        form.removeEventListener('submit', this.submitHadndler)
    }
}

export const header = new Header({ rootNode: document.getElementById('root') });
