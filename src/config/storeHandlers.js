import { reducerUser } from '@store/reducers/reducerUser.js';
import { reducerActor } from '@store/reducers/reducerActor.js';

/**
* Устанавливает соответствие между типом Action'а и методом редьюсера
*/
const handlers = [
    { type: 'login', methodStore: reducerUser.login.bind(reducerUser) },
    { type: 'signup', methodStore: reducerUser.signup.bind(reducerUser) },
    { type: 'auth', methodStore: reducerUser.auth.bind(reducerUser) },
    { type: 'logout', methodStore: reducerUser.logout.bind(reducerUser) },
    { type: 'getSettings', methodStore: reducerUser.getSettings.bind(reducerUser) },
    { type: 'putSettings', methodStore: reducerUser.putSettings.bind(reducerUser) },
    { type: 'putAvatar', methodStore: reducerUser.putAvatar.bind(reducerUser) },

    { type: 'getActor', methodStore: reducerActor.getActor.bind(reducerActor) },
];

export { handlers };
