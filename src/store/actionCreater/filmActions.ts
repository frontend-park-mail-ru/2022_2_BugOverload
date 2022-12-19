export const actionGetFilmData = (id :number) => ({
    type: 'getFilmData',
    value: {
        id,
    },
});

export const actionRate = (ratingData: rateParams) => ({
    type: 'rate',
    value: ratingData,
});

export const actionDeleteRate = (ratingData: rateParams) => ({
    type: 'deleteRate',
    value: ratingData,
});

export const actionGetMetaDataFilm = (filmID: metaDateParams) => ({
    type: 'getMetaDataFilm',
    value: filmID,
});

export const actionGetDataReviews = (data: reviewParams) => ({
    type: 'getDataReviews',
    value: data,
});

export const actionSendReview = (reviewData: review) => ({
    type: 'sendReview',
    value: reviewData,
});

export const actionGetPremieresData = (params: premiereParams) => ({
    type: 'getPremieresData',
    value: params,
});

export const actionSaveToCollection = (params: filmToCollParams) => ({
    type: 'saveToCollection',
    value: params,
});

export const actionRemoveFromCollection = (params: filmToCollParams) => ({
    type: 'removeFromCollection',
    value: params,
});

export const actionGetSimilarFilms = (idFilm: number) => ({
    type: 'getSimilarFilms',
    value: idFilm,
});
