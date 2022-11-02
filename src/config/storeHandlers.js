import { reducerUser } from '@store/reducers/reducerUser.js';
import { reducerFilm } from '@store/reducers/reducerFilm.js';

/**
* Устанавливает соответствие между типом Action'а и методом редьюсера
*/
const handlers = [
    { type: 'login', methodStore: reducerUser.login.bind(reducerUser) },
    { type: 'signup', methodStore: reducerUser.signup.bind(reducerUser) },
    { type: 'auth', methodStore: reducerUser.auth.bind(reducerUser) },
    { type: 'logout', methodStore: reducerUser.logout.bind(reducerUser) },

    { type: 'getFilmData', methodStore: reducerFilm.getFilmData.bind(reducerFilm) },
    { type: 'getMetaDataFilm', methodStore: reducerFilm.getMetaDataFilm.bind(reducerFilm) },
    { type: 'rate', methodStore: reducerFilm.rate.bind(reducerFilm) },
    { type: 'deleteRate', methodStore: reducerFilm.deleteRate.bind(reducerFilm) },

    // { type: 'openDescription', methodStore: reducerFilm.openDescription.bind(reducerFilm) },
    // { type: 'openDetails', methodStore: reducerFilm.openDetails.bind(reducerFilm) },

    { type: 'getSettings', methodStore: reducerUser.getSettings.bind(reducerUser) },
    { type: 'putSettings', methodStore: reducerUser.putSettings.bind(reducerUser) },

];

export { handlers };
