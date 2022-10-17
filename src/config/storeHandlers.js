import { reducerUser } from '@store/reducers/reducerUser.js';

const handlers = [
    { type: 'user', methodStore: reducerUser.get.bind(reducerUser) },

    { type: 'setUser', methodStore: reducerUser.set.bind(reducerUser) },
    { type: 'login', methodStore: reducerUser.login.bind(reducerUser) },
    { type: 'signup', methodStore: reducerUser.signup.bind(reducerUser) },
    { type: 'auth', methodStore: reducerUser.auth.bind(reducerUser) },
    { type: 'logout', methodStore: reducerUser.logout.bind(reducerUser) },
];

export { handlers };
