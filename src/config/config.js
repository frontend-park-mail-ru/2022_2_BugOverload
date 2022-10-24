import { Login } from '@components/Login/login.js';
import { Signup } from '@components/Signup/signup.js';
import { renderMainPage } from '@views/MainPage/mainPage.js';

export const ROOT = document.getElementById('root');

const login = new Login({ rootNode: ROOT });
const signup = new Signup({ rootNode: ROOT });
export const routes = [
    { path: '/', renderView: renderMainPage },
    { path: '/login/', renderView: login.render.bind(login) },
    { path: '/signup/', renderView: signup.render.bind(signup) },
];
