export const actionGetFilmData = (filmId) => ({
    type: 'getFilmData',
    value: filmId,
});

export const actionRate = (ratingData) => ({
    type: 'rate',
    value: ratingData,
});

export const actionDeleteRate = (ratingData) => ({
    type: 'deleteRate',
    value: ratingData,
});

export const actionGetMetaDataFilm = (filmID) => ({
    type: 'getMetaDataFilm',
    value: filmID,
});

export const actionGetDataReviews = (data) => ({
    type: 'getDataReviews',
    value: data,
});

export const actionSendReview = (reviewData) => ({
    type: 'sendReview',
    value: reviewData,
});
