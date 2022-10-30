import { reducerUser } from '@store/reducers/reducerUser.js';

const handlers = [
    { type: 'login', methodStore: reducerUser.login.bind(reducerUser) },
    { type: 'signup', methodStore: reducerUser.signup.bind(reducerUser) },
    { type: 'auth', methodStore: reducerUser.auth.bind(reducerUser) },
    { type: 'logout', methodStore: reducerUser.logout.bind(reducerUser) },
    { type: 'getSettings', methodStore: reducerUser.getSettings.bind(reducerUser) },
    { type: 'putSettings', methodStore: reducerUser.putSettings.bind(reducerUser) },
];

export { handlers };
