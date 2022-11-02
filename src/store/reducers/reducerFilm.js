import { Ajax } from '@utils/ajax.js';
import { API } from '@config/config.js';

class ReducerFilm {
    async getFilmData(data) {
        const response = await Ajax.get(API.film(data.filmID));
        if (response.status === 200) {
            return { film: response.body };
        }

        return null;
    }

    async rate(ratingData) {
        const response = await Ajax.post({
            url: API.rate,
            body: ratingData,
        });

        if (response.status === 200) {
            console.log(`GETTED IN REDUCER RATE: ${response.body.date}, ${response.body.rate}, ${response.body.filmID}`);
            return {
                rating: response.body,
                statusRating: null,
            };
        }
        return { statusRating: response.status };
    }

    async deleteRate(ratingData) {
        const response = await Ajax.post({
            url: API.delrate,
            body: ratingData,
        });
        if (response.status === 200) {
            console.log(`GETTED IN DELETE RATE: ${API.delrate} ${response.body.toString()}`);
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
            console.log(`GETTED IN getMetaDataFilm: ${JSON.stringify(response.body)}`);
            return {
                listCollections: response.body.listCollections,
                rating: response.body.rating,
            };
        }
        return { statusMetaData: response.status };
    }

    async getDataReviews(data) {
        const response = await Ajax.get(API.reviews(data.filmID, data.count, data.delimeter));
        if (response.status === 200) {
            // debugger;
            console.log(`getDataReviews: ${JSON.stringify(response.body)}`);
            if (data.delimeter === 0) {
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
            url: API.sendreview,
            body: reviewData,
        });

        if (response.status === 200) {
            console.log(`GETTED sendReview: ${JSON.stringify(response.body)}`);
            // return {
            //     listCollections: response.body.listCollections,
            //     rating: response.body.rating,
            // };
            // store.dispatch();
        }
        // return { statusMetaData: response.status };
    }
}

export const reducerFilm = new ReducerFilm();
