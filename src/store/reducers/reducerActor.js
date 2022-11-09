import { Ajax } from '@utils/ajax.js';
import { API, responsStatuses } from '@config/config.js';
import { render404 } from '@router/Page404/page404.js';

class ReducerActor {
    async getActor({ id, numberPhotos }) {
        let response;
        try{
            response = await Ajax.get(API.person(id, numberPhotos));
        } catch(e) {
            render404();
            return null;
        }
        
        if (response.status === responsStatuses.OK) {
            return {
                [`actor${id}`]: handlerPropertiesPerson(
                    id,
                    response.body,
                    [
                        'avatar',
                        'images',
                        'professions',
                    ],
                ),
            };
        }
        return null;
    }
}

export const reducerActor = new ReducerActor();

const handlerPropertiesPerson = (id, object, nameProperties) => {
    nameProperties.forEach((key) => {
        if (key === 'avatar') {
            const newUrl = API.img.person_avatar(object[key]);
            if (object[key] !== newUrl) {
                object[key] = newUrl;
            }
        }
        if (key === 'images') {
            const images = object[key];
            images.forEach((image, index) => {
                const newUrl = API.img.person_image(id, image);
                if (image !== newUrl) {
                    object[key][index] = newUrl;
                }
            });
        }
        if (key === 'professions') {
            object[key] = object[key].join(', ');
        }
    });

    return object;
};
