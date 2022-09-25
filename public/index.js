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

const voidFunc = () => {}

function renderTemplate(templateName,callback) {
    const template = Handlebars.templates[templateName];
    const templateHtml = template({});
    const safeheaderHtml = DOMPurify.sanitize(templateHtml);
    callback(safeheaderHtml);
}

function renderHeader() {
    renderTemplate('header', (safeHtml) => {
        root.insertAdjacentHTML('beforebegin', safeHtml);
    });

    const header = document.querySelector('.header');
    header.addEventListener('click', (e) => {
        const { target } = e;
    
        if (target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement) {
            e.preventDefault();
            goToPage(config.header[target.dataset.section]);
        }
    });
}

function goToPage(menuElement,callback = voidFunc) {
    let activeLink = document.body.querySelector('.active')
    if (activeLink) {
        activeLink.classList.remove('active');
    }
    document.body.querySelector(`[data-section="${menuElement.href.slice(1)}"]`).classList.add('active');
    if (callback != voidFunc) {
        callback();
    }
    menuElement.render();
}

async function ajax(method, url, body = null, callback) {
    let response = await fetch(
        url, {
            method: method,
            body: body
    });

    callback(response);
}

function createInput(type, text, name) {
	const input = document.createElement('input');
	input.type = type;
	input.name = name;
	input.placeholder = text;

	return input;
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

    function cklickRegister(e) {
        const { target } = e;
    
        if (target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement) {
            e.preventDefault();

            goToPage(config.login[target.dataset.section], () => {
                modalWindow              
                    .querySelector('.modal__login')
                    .remove();
                modalWindow              
                    .querySelector('.modal__login__img')
                    .remove();
                modalWindow.removeEventListener('click', cklickRegister); 
            });
        }
    };

    modalWindow.addEventListener('click', cklickRegister); 

/*
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        ajax(
            'POST',
            '/login',
            { email, password },
            (response => {
                if (response.status === 200) {
                    goToPage(config.menu.profile);
                    return;
                }

                alert('АХТУНГ! НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
            })
        )
    });

    return form;*/
}

function renderSignup() {
    if (root.querySelector('.modal__window') === null) {
        renderModal();
    }

    const modalWindow = root.querySelector('.modal__window__flex');
    renderTemplate('signup', (safeHtml) => {
        modalWindow.insertAdjacentHTML('afterbegin', safeHtml);
    });

    function cklickSignup(e) {
        const { target } = e;
    
        if (target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement) {
            e.preventDefault();

            goToPage(config.login[target.dataset.section], () => {
                modalWindow              
                    .querySelector('.modal__signup__img')
                    .remove();
                modalWindow              
                    .querySelector('.modal__signup')
                    .remove();
                modalWindow.removeEventListener('click', cklickSignup); 
            });
        }
    };

    modalWindow.addEventListener('click', cklickSignup); 

}

renderHeader();
