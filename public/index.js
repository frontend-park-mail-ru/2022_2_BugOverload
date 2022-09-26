const root = document.getElementById('root');

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

function renderTemplate(templateName,callback) {
    const template = Handlebars.templates[templateName];
    const templateHtml = template({});
    const safeheaderHtml = DOMPurify.sanitize(templateHtml);
    callback(safeheaderHtml);
}

function renderHeader(user = null) {
    if(document.querySelector('.header')) {
        document
            .querySelector('.header')
            .remove();
    }
    if(user) {
        console.log(user)
    }

    renderTemplate('header', (safeHtml) => {
        root.insertAdjacentHTML('beforebegin', safeHtml);
    });

    const header = document.querySelector('.header');
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

const renderFunc = (menuElement) => {
    menuElement.render();
};

function goToPage(menuElement,callback = renderFunc) {
    let activeLink = document.body.querySelector('.active')
    if (activeLink) {
        activeLink.classList.remove('active');
    }
    document.body.querySelector(`[data-section="${menuElement.href.slice(1)}"]`).classList.add('active');
    (callback != renderFunc) ? callback() : renderFunc(menuElement);
}

async function ajax(method, url, data = null, callback) {
    console.log(data)
    console.log(JSON.stringify(data))
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

    function deleteLogin(e) {
        const { target } = e;
    
        if (target instanceof HTMLAnchorElement) {
            e.preventDefault();

            goToPage(config.login[target.dataset.section], () => {
                modalWindow.removeEventListener('click', deleteLogin); 
                modalWindow              
                    .querySelector('.modal__login')
                    .remove();
                modalWindow              
                    .querySelector('.modal__login__img')
                    .remove();
                config.login[target.dataset.section].render();
            });
        }
    }

    modalWindow.addEventListener('click', deleteLogin); 

    modalWindow.addEventListener('submit', (e) => {
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

function renderSignup() {
    if (root.querySelector('.modal__window') === null) {
        renderModal();
    }

    const modalWindow = root.querySelector('.modal__window__flex');
    renderTemplate('signup', (safeHtml) => {
        modalWindow.insertAdjacentHTML('afterbegin', safeHtml);
    });

    function deleteSignup(e) {
        const { target } = e;
    
        if (target instanceof HTMLAnchorElement) {
            e.preventDefault();

            goToPage(config.login[target.dataset.section], () => {
                modalWindow.removeEventListener('click', deleteSignup); 
                modalWindow              
                    .querySelector('.modal__signup')
                    .remove();
                modalWindow              
                    .querySelector('.modal__signup__img')
                    .remove();
                config.login[target.dataset.section].render();
            });
        }
    }

    modalWindow.addEventListener('click', deleteSignup); 

}

renderHeader();
