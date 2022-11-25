import { reducerUser } from '@store/reducers/reducerUser';
import { reducerFilm } from '@store/reducers/reducerFilm';
import { reducerCommon } from '@store/reducers/reducerCommon';
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
    { type: 'getPremieresData', methodStore: reducerFilm.getPremieresData.bind(reducerFilm) },

    { type: 'getCollectionData', methodStore: reducerCommon.getCollectionData.bind(reducerCommon) },
    { type: 'getPreviewData', methodStore: reducerCommon.getPreviewData.bind(reducerCommon) },
    { type: 'getSearchData', methodStore: reducerCommon.getSearchData.bind(reducerCommon) },

    { type: 'getSettings', methodStore: reducerUser.getSettings.bind(reducerUser) },
    { type: 'putSettings', methodStore: reducerUser.putSettings.bind(reducerUser) },
    { type: 'putAvatar', methodStore: reducerUser.putAvatar.bind(reducerUser) },

    { type: 'getActor', methodStore: reducerActor.getActor.bind(reducerActor) },

    { type: 'getPublicProfile', methodStore: reducerUser.getPublicProfile.bind(reducerUser) },
];

export { handlers };
