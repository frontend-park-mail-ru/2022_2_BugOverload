import { reducerUser } from '@store/reducers/reducerUser.js';
import { reducerFilm } from '@store/reducers/reducerFilm.js';

const handlers = [
    { type: 'login', methodStore: reducerUser.login.bind(reducerUser) },
    { type: 'signup', methodStore: reducerUser.signup.bind(reducerUser) },
    { type: 'auth', methodStore: reducerUser.auth.bind(reducerUser) },
    { type: 'logout', methodStore: reducerUser.logout.bind(reducerUser) },

    { type: 'getFilmData', methodStore: reducerFilm.getFilmData.bind(reducerFilm) },
];

export { handlers };
