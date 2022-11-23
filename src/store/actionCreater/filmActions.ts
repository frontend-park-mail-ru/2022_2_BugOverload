export const actionGetFilmData = (id :number) => ({
    type: 'getFilmData',
    value: {
        id,
    },
});

export const actionRate = (ratingData :ratingData) => ({
    type: 'rate',
    value: ratingData,
});

export const actionDeleteRate = (ratingData :ratingData) => ({
    type: 'deleteRate',
    value: ratingData,
});

export const actionGetMetaDataFilm = (filmID :number) => ({
    type: 'getMetaDataFilm',
    value: filmID,
});

export const actionGetDataReviews = (data: Array<review>) => ({
    type: 'getDataReviews',
    value: data,
});

export const actionSendReview = (reviewData: review) => ({
    type: 'sendReview',
    value: reviewData,
});

export const actionGetPremieresData = (params) => ({
    type: 'getPremieresData',
    value: params,
});
