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