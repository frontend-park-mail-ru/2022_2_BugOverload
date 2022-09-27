const root = document.getElementById('root');
//import {config} from './__mocks__/config.js';
const config = {
    header: {
        navlink: {
            href: '/navlink',
            name: 'Главная',
            //render: renderMain,
        },
        login: {
            href: '/login',
            name: 'Авторизация',
            render: renderLogin,
        },
    },
    login: {
        signup: {
            href: '/signup',
            name: 'Регистрация',
            render: renderSignup,
        },
        login: {
            href: '/login',
            name: 'Авторизация',
            render: renderLogin,
        },
    }
}

async function ajax(method, url, data, callback) {
    console.log(data)
    console.log(JSON.stringify(data))
    if (method === 'POST') {
        let response = await fetch(
            url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify(data),
        });
    
        const result = await response.json();
    
        callback(response, result);
    } else {
        let response = await fetch(url);
        let result = await response.json();
        console.log(result);
        callback(response, result);
    }
}

function renderTemplate(templateName, callback, parametrs = {}) {
    const template = Handlebars.templates[templateName];
    const templateHtml = template(parametrs);
    const safeheaderHtml = DOMPurify.sanitize(templateHtml);
    callback(safeheaderHtml);
}

function renderUserbar(user) {
    const userbar = document.body.querySelector('.header__userbar');

    renderTemplate('userbar', (safeHtml) => {
        userbar.insertAdjacentHTML('beforeend', safeHtml);
    }, user);
}

const renderHeaderUser = (user = null) => {
    renderTemplate('header', (safeHtml) => {
        root.insertAdjacentHTML('beforebegin', safeHtml);
    },
    user);

    const header = document.querySelector('.header');
    
    if(user) {
        const ava = header.querySelector('.header__avatar');

        function openUserbar(e) {
            const { target } = e;

            renderUserbar(user);
        }

        ava.addEventListener('click', openUserbar)
    }

    header.addEventListener('click', (e) => {
        const { target } = e;
    
        if (target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement) {
            e.preventDefault();
            goToPage(config.header[target.dataset.section], () => {
                document.body
                    .querySelector('.active')
                    .classList.remove('active');
                    config.header[target.dataset.section].render();
            });
        }
    });
}

function renderHeader(user = null) {
    if(document.querySelector('.header')) {
        document
            .querySelector('.header')
            .remove();
    }

    if(!user) {
        ajax(
            'GET',
            'auth',
            {},
            (response, result) => {
                if (response.status === 200) {
                    user = result;
                    renderHeaderUser(user);
                    return;
                }
                renderHeaderUser(user);
            })
    } else {
        renderHeaderUser(user);
    }
}

const renderFunc = (menuElement) => {
    menuElement.render();
};

function goToPage(menuElement,callback = renderFunc,current = document.body) {
    let activeLink = current.querySelector('.active')
    if (activeLink) {
        activeLink.classList.remove('active');
    }
    current.querySelector(`[data-section="${menuElement.href.slice(1)}"]`).classList.add('active');
    (callback != renderFunc) ? callback() : renderFunc(menuElement);
}

function renderModal() {
    renderTemplate('modal', (safeHtml) => {
        root.insertAdjacentHTML('afterbegin', safeHtml);
    });
    
    document.body
        .querySelector('.modal__cross')
        .addEventListener('click', (e) => {
            e.preventDefault();
            document.body
                .querySelector('.modal__background')
                .remove();
        }); 
}

function renderLogin() {
    if (!root.querySelector('.modal__window')) {
        renderModal();
    }

    const modalWindow = root.querySelector('.modal__window__flex');


    renderTemplate('login', (safeHtml) => {
        modalWindow.insertAdjacentHTML('afterbegin', safeHtml);
    });

    const loginImg = root.querySelector('.modal__login__img');

    loginImg.addEventListener('click', (e) => {
        const { target } = e;
    
        if (target instanceof HTMLAnchorElement) {
            e.preventDefault();

            goToPage(config.login[target.dataset.section], () => {
                modalWindow              
                    .querySelector('.modal__login')
                    .remove();
                modalWindow              
                    .querySelector('.modal__login__img')
                    .remove();
                config.login[target.dataset.section].render();
            }, 
            modalWindow);
        }
    });

    const form = modalWindow.querySelector('.modal__form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = modalWindow.querySelector('input[type=email]');
        const passwordInput = modalWindow.querySelector('input[type=password]');
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        ajax(
            'POST',
            '/login',
            { email, password },
            (response, result) => {
                if (response.status === 200) {
                    
                    document.body
                        .querySelector('.modal__background')
                        .remove();
                    
                    renderHeader(result);

                    return;
                }

                console.log(response.status);

                alert('АХТУНГ! НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
            })
    });
}

function checkInput(input, type = 'text'){
    if (type == 'email' && (!input || !input.match(/@/))) {
          return false;
    }
    if (type == 'password' && (!input || !input.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g))) {
        return false;
    }
    /*if (!input || !input.match(/^[\p{L}\p{M}][\p{L}\p{M}\'\-]{0,48}[\p{L}\p{M}]$/u)) {
        return false;
    }*/
    return true;
}

function renderSignup() {
    if (root.querySelector('.modal__window') === null) {
        renderModal();
    }

    const modalWindow = root.querySelector('.modal__window__flex');
    renderTemplate('signup', (safeHtml) => {
        modalWindow.insertAdjacentHTML('afterbegin', safeHtml);
    });
    
    const loginImg = root.querySelector('.modal__signup__img');

    loginImg.addEventListener('click', (e) => {
        const { target } = e;
    
        if (target instanceof HTMLAnchorElement) {
            e.preventDefault();

            goToPage(config.login[target.dataset.section], () => {
                modalWindow              
                    .querySelector('.modal__signup')
                    .remove();
                modalWindow              
                    .querySelector('.modal__signup__img')
                    .remove();
                config.login[target.dataset.section].render();
            },
            modalWindow);
        }
    });

    const form = modalWindow.querySelector('.modal__form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nickInput = modalWindow.querySelector('input[type=text]');
        const emailInput = modalWindow.querySelector('input[type=email]');
        const passwordInput = modalWindow.querySelector('input[type=password]');

        const user = {};
        user.nickname = nickInput.value;
        user.email = emailInput.value.trim();
        user.password = passwordInput.value; 



        for (let key in user) {
            

            if (key === 'email' || key === 'password') {
                if (!checkInput(user[key],key)) {
                    console.log(key)
                    return;
                }
            } else {
                if (!checkInput(user[key])) {
                    console.log(key)
                    return;
                }
            }
        } 

        console.log(user.nickname)

        ajax(
            'POST',
            '/signup',
            user,
            (response, result) => {
                if (response.status === 201) {
                    
                    document.body
                        .querySelector('.modal__background')
                        .remove();
                    
                    renderHeader(result);

                    return;
                }

                console.log(response.status);

                alert('АХТУНГ! НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
            })
    });
}

renderHeader();
