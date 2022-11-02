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

    // async openDescription() {
    //     return {
    //         descriptionIsActive: true,
    //         ratingIsActive: true,
    //         detailsIsActive: false,
    //     };
    // }

    // async openDetails() {
    //     return {
    //         descriptionIsActive: false,
    //         ratingIsActive: false,
    //         detailsIsActive: true,
    //     };
    // }

    // async closeDescription() {
    //     return { descriptionIsActive: false };
    // }

    // async closeDetails() {
    //     return { detailsIsActive: false };
    // }
}

export const reducerFilm = new ReducerFilm();
