import { Ajax } from '@utils/ajax';
import { getDateNow } from '@utils/common.js';
import { API, responsStatuses } from '@config/config.js';
import { store } from '@store/Store';
import { mockFilm } from '@store/reducers/mockData';

class ReducerFilm {
    async getFilmData({ id } :{id :number}) {
        let response;
        try {
            response = await Ajax.get(API.film(id)) as Response;
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

    async rate(ratingData :anyObject) {
        const response = await Ajax.post({
            url: API.rate(ratingData.filmID),
            body: { score: +ratingData.rate },
        }) as anyObject;

        if (response.status === responsStatuses.OK) {
            return {
                countScores: response.body?.count_ratings,
                rating: { value: ratingData.rate, dateRating: getDateNow() },
                statusRating: response.status,
            } as anyObject;
        }
        return { statusRating: response.status };
    }

    async deleteRate({ filmID } :{filmID :number} ) {
        const response = await Ajax.delete({
            url: API.del_rate(filmID),
        }) as anyObject;
        if (response.status === responsStatuses.OK) {
            return {
                countScores: response.body?.count_ratings,
                rating: null,
                statusRating: null,
            } as anyObject;
        }
        return { statusRating: response.status };
    }

    async getMetaDataFilm(data :anyObject) {
        const response = await Ajax.get(API.metaFilm(data.filmID)) as anyObject;
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

    async getDataReviews(data :anyObject) {
        const response = await Ajax.get(API.reviews(data.filmID, data.count, data.offset)) as Response;
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

    async sendReview(reviewData :anyObject) {
        const response = await Ajax.post({
            url: API.send_review(reviewData.filmID),
            body: reviewData,
        }) as Response;

        if (response.status === responsStatuses.Created) {
            const { avatar, nickname } = store.getState('user');
            const countReviews = (store.getState('countReviews') || 0) + 1;
            const { body, name, type } = reviewData;
            return {
                authorReview: response.body,
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

const handlerAvatarReviews = (object :anyObject) => {
    object.forEach((element :any) => {
        element.author.avatar = API.img.user_avatar(element.author.avatar);
    });
    return object;
};
