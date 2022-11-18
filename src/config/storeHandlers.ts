import { reducerUser } from '@store/reducers/reducerUser';
import { reducerFilm } from '@store/reducers/reducerFilm';
import { reducerCommonComponents } from '@store/reducers/reducerCommonComponents';
import { reducerActor } from '@store/reducers/reducerActor';

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
    { type: 'getDataReviews', methodStore: reducerFilm.getDataReviews.bind(reducerFilm) },
    { type: 'sendReview', methodStore: reducerFilm.sendReview.bind(reducerFilm) },

    { type: 'getCollectionData', methodStore: reducerCommonComponents.getCollectionData.bind(reducerCommonComponents) },
    { type: 'getPreviewData', methodStore: reducerCommonComponents.getPreviewData.bind(reducerCommonComponents) },

    { type: 'getSettings', methodStore: reducerUser.getSettings.bind(reducerUser) },
    { type: 'putSettings', methodStore: reducerUser.putSettings.bind(reducerUser) },
    { type: 'putAvatar', methodStore: reducerUser.putAvatar.bind(reducerUser) },

    { type: 'getActor', methodStore: reducerActor.getActor.bind(reducerActor) },

    { type: 'getPublicProfile', methodStore: reducerUser.getPublicProfile.bind(reducerUser) },
];

export { handlers };
