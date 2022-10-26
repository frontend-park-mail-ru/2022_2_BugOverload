import { Ajax } from '@utils/ajax.js';
import { API } from '@config/config.js';

class ReducerFilm {
    async getFilmData() {
        const responsePromise = await Ajax.get(API.about_film(1));
        const response = await responsePromise;
        if (response.status === 200) {
            return { film: response.body };
        }

        return null;
    }
}

export const reducerFilm = new ReducerFilm();
