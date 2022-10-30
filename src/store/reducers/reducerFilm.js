import { Ajax } from '@utils/ajax.js';
import { API } from '@config/config.js';

class ReducerFilm {
    async getFilmData() {
        const response = await Ajax.get(API.film(321));
        if (response.status === 200) {
            return { film: response.body };
        }

        return null;
    }

    async openDescription() {
        return {
            descriptionIsActive: true,
            ratingIsActive: true,
            detailsIsActive: false,
        };
    }

    async openDetails() {
        return {
            descriptionIsActive: false,
            ratingIsActive: false,
            detailsIsActive: true,
        };
    }

    // async closeDescription() {
    //     return { descriptionIsActive: false };
    // }

    // async closeDetails() {
    //     return { detailsIsActive: false };
    // }
}

export const reducerFilm = new ReducerFilm();
