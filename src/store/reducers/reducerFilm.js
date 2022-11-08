import { Ajax } from '@utils/ajax.js';
import { API } from '@config/config.js';
import { store } from '@store/Store.js';

class ReducerFilm {
    async getFilmData({ id }) {
        const response = await Ajax.get(API.film(id));
        if (response.status === 200) {
            return { [`film${id}`]: response.body };
        }

        return { filmStatus: response.status };
    }

    async rate(ratingData) {
        const response = await Ajax.post({
            url: API.rate(ratingData.filmID),
            body: { rate: ratingData.rate },
        });

        if (response.status === 201) {
            return {
                rating: response.body,
                statusRating: null,
            };
        }
        return { statusRating: response.status };
    }

    async deleteRate({ filmID }) {
        const response = await Ajax.post({
            url: API.del_rate(filmID),
        });
        if (response.status === 204) {
            return {
                rating: null,
                statusRating: null,
            };
        }
        return { statusRating: response.status };
    }

    async getMetaDataFilm(data) {
        const response = await Ajax.get(API.metaFilm(data.filmID));
        if (response.status === 200) {
            return {
                listCollections: response.body.listCollections,
                rating: response.body.rating,
                countReviews: response.body.countReviews,
            };
        }
        return { statusMetaData: response.status };
    }

    async getDataReviews(data) {
        const response = await Ajax.get(API.reviews(data.filmID, data.count, data.offset));
        if (response.status === 200) {
            if (data.offset === 0) {
                return {
                    infoReviews: response.body.infoReviews,
                    reviews: response.body.reviews,
                };
            }
            return {
                reviews: response.body.reviews,
            };
        }
        return { statusReviews: response.status };
    }

    async sendReview(reviewData) {
        const response = await Ajax.post({
            url: API.send_review(reviewData.filmID),
            body: reviewData,
        });

        if (response.status === 201) {
            return {
                countReviews: store.getState('countReviews') + 1,
            };
        }

        return { statusSendReview: response.status };
    }
}

export const reducerFilm = new ReducerFilm();
