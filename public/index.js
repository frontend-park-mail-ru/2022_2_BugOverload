const root = document.getElementById('root');

const config = {
    navbar:{
        href: '/',
        name: 'Главная',
        //render: renderMain,
    },
    login: {
        href: '/login',
        name: 'Авторизация',
        //render: renderLogin,
    },
}


let template = Handlebars.templates['navbar'];
let navbarHtml = template({});

const safeNavbarHtml = DOMPurify.sanitize(navbarHtml)
root.insertAdjacentHTML('beforebegin',safeNavbarHtml)

const login = document.querySelector('.header__login');
const navbar = document.querySelector('navbar');

function goToPage(menuElement) {
	root.querySelector('.active').classList.remove('active');
	root.querySelector(`[data-section=${menuElement.href.slice(1)}]`).classList.add('active');
}

navbar.addEventListener('click', (e) => {
	const {target} = e;

	if (target instanceof HTMLAnchorElement) {
		e.preventDefault();
		goToPage(config.menu[target.dataset.section]);
	}
});
