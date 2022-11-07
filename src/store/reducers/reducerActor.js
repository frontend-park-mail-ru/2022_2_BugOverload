import { Ajax } from '@utils/ajax.js';
import { API, responsStatuses } from '@config/config.js';

class ReducerActor {
    async getActor({ id, numberPhotos }) {
        const responsePromise = Ajax.get(API.person(id, numberPhotos));

        const response = await responsePromise;
        if (response.status === responsStatuses.OK) {
            return {
                [`actor${id}`]: handlerPropertiesPerson(
                    id,
                    response.body,
                    [
                        'avatar',
                        'images',
                        'professions',
                    ]
                ),
            };
        }
        return null;
    }
}

export const reducerActor = new ReducerActor();

const handlerPropertiesPerson = (id, object, nameProperties) => {
    nameProperties.forEach(key => {
        if (key === 'avatar') {
            const newUrl = `http://movie-gate.online:8088/api/v1/image?object=person_avatar&key=${object[key]}`;
            if (object[key] !== newUrl) {
                object[key] = newUrl;
            }
        }
        if (key === 'images') {
            const images = object[key];
            images.forEach((image, index) => {
                const newUrl = `http://movie-gate.online:8088/api/v1/image?object=person_image&key=${id}/${image}`;
                if (image !== newUrl) {
                    object[key][index] = newUrl;
                }
            });
        }
        if (key === 'professions') {
            console.log(object[key])
            object[key] = object[key].join(', ');
        }
    });

    return object;
};

