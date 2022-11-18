import { Ajax } from '@utils/ajax';
import { API, responsStatuses } from '@config/config.js';
import { mockPerson } from '@store/reducers/mockData';

interface personResponse{
    status: Number;
    body: person;
}

class ReducerActor {
    async getActor({ id, numberPhotos } :{ id :number, numberPhotos:number }) {
        let response;
        try {
            response = await Ajax.get(API.person(id, numberPhotos)) as personResponse;
        } catch (e) {
            return {
                [`actor${id}`]: mockPerson(),
            };
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

const handlerPropertiesPerson = (id :number, object :person, nameProperties :Array<string>) => {
    nameProperties.forEach((key) => {
        if (key === 'avatar') {
            const newUrl = API.img.person_avatar(object[key]);
            object[key] = newUrl;
        }
        if (key === 'images') {
            const images = object[key];
            images.forEach((image, index) => {
                const newUrl = API.img.person_image(id, image);
                object[key][index] = newUrl;
            });
        }
        if (key === 'professions') {
            object[key] = object[key].join(', ');
        }
    });

    return object;
};
