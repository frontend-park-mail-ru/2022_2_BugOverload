import { Ajax } from '@utils/ajax.js';
import { getDateNow } from '@utils/common.js';
import { API, responsStatuses } from '@config/config.js';
import { store } from '@store/Store.js';
import { mockFilm } from '@store/reducers/mockData.js';

class ReducerFilm {
    async getFilmData({ id }) {
        let response;
        try {
            response = await Ajax.get(API.film(id));
        } catch (e) {
            return { [`film${id}`]: mockFilm() };
        }
        if (response.status === responsStatuses.OK) {
            return { [`film${id}`]: response.body };
        }

        return { filmStatus: response.status };
    }

    async rate(ratingData) {
        const response = await Ajax.post({
            url: API.rate(ratingData.filmID),
            body: { score: ratingData.rate * 1.0 },
        });

        if (response.status === responsStatuses.NoContent) {
            return {
                rating: { value: ratingData.rate, dateRating: getDateNow() },
                statusRating: null,
            };
        }
        return { statusRating: response.status };
    }

    async deleteRate({ filmID }) {
        const response = await Ajax.delete({
            url: API.del_rate(filmID),
        });
        if (response.status === responsStatuses.NoContent) {
            return {
                rating: null,
                statusRating: null,
            };
        }
        return { statusRating: response.status };
    }

    async getMetaDataFilm(data) {
        const response = await Ajax.get(API.metaFilm(data.filmID));
        if (response.status === responsStatuses.OK) {
            return {
                listCollectionsUser: response.body.collections,
                rating: {
                    value: response.body.rating,
                    dateRating: response.body.date_rating,
                },
                countReviews: response.body.count_reviews,
            };
        }
        return { statusMetaData: response.status };
    }

    async getDataReviews(data) {
        const response = await Ajax.get(API.reviews(data.filmID, data.count, data.offset));
        if (response.status === responsStatuses.OK) {
            return {
                reviews: response.body,
            };
        }

        if (response.status === responsStatuses.NotFound
                || response.status === responsStatuses.BadRequest) {
            return {
                reviews: null,
            };
        }
        return { statusReviews: response.status };
    }

    async sendReview(reviewData) {
        const response = await Ajax.post({
            url: API.send_review(reviewData.filmID),
            body: reviewData,
        });

        if (response.status === responsStatuses.Created) {
            const { avatar, nickname } = store.getState('user');
            const { countReviews } = (store.getState('countReviews') || 0) + 1;
            const { body, name, type } = reviewData;
            return {
                countReviews,
                userReview: {
                    author: {
                        avatar,
                        nickname,
                        countReviews,
                    },
                    body,
                    name,
                    type,
                    create_time: getDateNow(),
                },
                statusSendReview: response.status,
            };
        }

        return { statusSendReview: response.status };
    }
}

export const reducerFilm = new ReducerFilm();
