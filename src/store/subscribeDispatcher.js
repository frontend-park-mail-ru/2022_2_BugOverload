import { dispatcher } from './Dispatcher.js';
import { Header } from '../components/Header/header.js';
import { Login } from '../components/Login/login.js';
import { Signup } from '../components/Signup/signup.js';

const root = document.getElementById('root');
const login = new Login(root);
const header = new Header(root);
const signup = new Signup(root);

dispatcher.subscribes = [
    {
        method: 'setUser',
        arrayFunc: [
            header.render.bind(header),
        ],
    },
    {
        method: 'login',
        arrayFunc: [
            login.render.bind(login),
        ],
    },
    {
        method: 'register',
        arrayFunc: [
            signup.render.bind(signup),
        ],
    },
];

export const subscribe = () => {
    for (const subscribe of dispatcher.subscribes) {
        dispatcher.mapSubscribers.set(subscribe.method, [...subscribe.arrayFunc]);
    }
};
