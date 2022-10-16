import { userStore } from '../store/models/User/user.js';

const handlers = [
    { method: 'getUser', methodStore: userStore.get.bind(userStore) },
    { method: 'setUser', methodStore: userStore.set.bind(userStore) },
    { method: 'login', methodStore: userStore.login.bind(userStore) },
    { method: 'register', methodStore: userStore.register.bind(userStore) },
    { method: 'auth', methodStore: userStore.auth.bind(userStore) },
    { method: 'logout', methodStore: userStore.logout.bind(userStore) },
];

export { handlers };
