export const actionGetListColls = (filmId) => ({
    type: 'getListColls',
    value: filmId,
});

export const actionSaveToColl = (filmId, nameColl) => ({
    type: 'saveToColl',
    value: {
        filmId,
        nameColl,
    },
});

export const actionOpenTrailer = (filmId) => ({
    type: 'openTrailer',
    value: filmId,
});

export const actionCreateColl = (nameColl) => ({
    type: 'createColl',
    value: nameColl,
});

export const actionOpenDescription = (filmId) => ({
    type: 'openDescription',
    value: filmId,
});

export const actionOpenDetails = (filmId) => ({
    type: 'openDetails',
    value: filmId,
});

export const actionSetRate = (filmId) => ({
    type: 'setRate',
    value: filmId,
});

export const actionDelRate = (filmId) => ({
    type: 'delRate',
    value: filmId,
});

export const actionPostReview = (filmId) => ({
    type: 'postReview',
    value: filmId,
});

export const actionMoreReviews = (filmId) => ({
    type: 'moreReviews',
    value: filmId,
});
