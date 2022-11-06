import { reducerUser } from '@store/reducers/reducerUser.js';
import { reducerFilm } from '@store/reducers/reducerFilm.js';
import { reducerCommonComponents } from '@store/reducers/reducerCommonComponents.js';
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

    { type: 'getFilmData', methodStore: reducerFilm.getFilmData.bind(reducerFilm) },

    { type: 'getCollectionData', methodStore: reducerCommonComponents.getCollectionData.bind(reducerCommonComponents) },
    { type: 'getPreviewData', methodStore: reducerCommonComponents.getPreviewData.bind(reducerCommonComponents) },

    { type: 'getActor', methodStore: reducerActor.getActor.bind(reducerActor) },
];

export { handlers };
