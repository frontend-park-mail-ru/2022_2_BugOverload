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
        if (response.status === responsStatuses.NotFound) {
            return { notFound: true };
        }

        return { filmStatus: response.status };
    }

    async rate(ratingData) {
        const response = await Ajax.post({
            url: API.rate(ratingData.filmID),
            body: { score: ratingData.rate },
        });

        if (response.status === responsStatuses.OK) {
            return {
                rating: { value: ratingData.rate, dateRating: getDateNow() },
                statusRating: response.status,
                countScores: response?.body?.count_scores,
            };
        }
        return { statusRating: response.status };
    }

    async deleteRate({ filmID }) {
        const response = await Ajax.delete({
            url: API.del_rate(filmID),
        });
        if (response.status === responsStatuses.OK) {
            return {
                rating: null,
                statusRating: null,
                countScores: response?.body?.count_scores,
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
                    value: response.body?.rating,
                    dateRating: response.body?.date_rating?.split(' ')[0].split('.').reverse().join('.'),
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
                reviews: handlerAvatarReviews(response.body),
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
            const countReviews = (store.getState('countReviews') || 0) + 1;
            const { body, name, type } = reviewData;
            return {
                countReviews,
                userReview: {
                    author: {
                        avatar,
                        nickname,
                        count_reviews: countReviews,
                    },
                    body,
                    name,
                    type,
                    create_time: getDateNow(),
                },
                statusSendReview: { status: response.status, type },
            };
        }

        return { statusSendReview: response.status };
    }
}

export const reducerFilm = new ReducerFilm();

const handlerAvatarReviews = (object) => {
    object.forEach((element) => {
        element.author.avatar = API.img.user_avatar(element.author.avatar);
    });
    return object;
};
