import { Ajax } from '@utils/ajax.js';
import { API } from '@config/config.js';

class ReducerFilm {
    async getFilmData(data) {
        const response = await Ajax.get(API.film(data.filmID));
        if (response.status === 200) {
            return { film: response.body };
        }

        return { filmStatus: response.status };
    }
}

export const reducerFilm = new ReducerFilm();
