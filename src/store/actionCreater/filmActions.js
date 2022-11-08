export const actionGetFilmData = (id) => ({
    type: 'getFilmData',
    value: {
        id,
    },
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
