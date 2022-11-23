import { Ajax } from '@utils/ajax';
import { API } from '@config/config';
import { mockCollection, mockPrewiew } from '@store/reducers/mockData';

class ReducerCommonComponents {
    async getCollectionData({target, key, sortParam, countFilms, delimiter} :collectionParams) {
        let response;
        try {
            response = await Ajax.get(API.collection(target, key, sortParam, countFilms, delimiter)) as Response;
        } catch (e) {
            return { [`collection-${key}`]: mockCollection() };
        }
        if (response.status === 200) {
            return { [`collection-${key}`]: response.body };
        }

        return { [`statusCollection-${key}`]: response.status };
    }

    async getPreviewData({name} :collectionParams) {
        let response;
        try {
            response = await Ajax.get(API.recommendation) as Response;
        } catch (e) {
            return { [`preview-${name}`]: mockPrewiew() };
        }

        if (response.status === 200) {
            return { [`preview-${name}`]: response.body };
        }

        return { [`statusPreview-${name}`]: response.status };
    }
}

export const reducerCommonComponents = new ReducerCommonComponents();
