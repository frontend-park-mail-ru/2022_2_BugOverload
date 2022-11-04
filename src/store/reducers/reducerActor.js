import { Ajax } from '@utils/ajax.js';
import { API, responsStatuses } from '@config/config.js';

class ReducerActor {
    async getActor({ id, numberPhotos }) {
        const responsePromise = Ajax.get(API.person(id, numberPhotos));

        const response = await responsePromise;
        if (response.status === responsStatuses.OK) {
            return {
                [`actor${id}`]: response.body,
            };
        }
        return null;
    }
}

export const reducerActor = new ReducerActor();
