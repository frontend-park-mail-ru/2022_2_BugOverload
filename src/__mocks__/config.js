import {Login} from '../components/Login/login.js'

export const config = {
    header: {
        navlink: {
            href: '/navlink',
            name: 'Главная',
            //render: renderMain,
        },
        login: {
            href: '/login',
            name: 'Авторизация',
            render: Login,
        },
    },
    login: {
        signup: {
            href: '/signup',
            name: 'Регистрация',
            //render: renderSignup,
        },
        login: {
            href: '/login',
            name: 'Авторизация',
            render: Login,
        },
    }
}

export const root = document.getElementById('root');