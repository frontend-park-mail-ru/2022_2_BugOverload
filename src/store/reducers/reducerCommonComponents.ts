import { Ajax } from '@utils/ajax';
import { API } from '@config/config.js';
import { mockCollection, mockPrewiew } from '@store/reducers/mockData';

class ReducerCommonComponents {
    async getCollectionData(params :collectionParams) {
        let response;
        try {
            response = await Ajax.get(API.collection(params.tag)) as Response;
        } catch (e) {
            return { [`collection-${params.name}`]: mockCollection() };
        }
        if (response.status === 200) {
            return { [`collection-${params.name}`]: response.body };
        }

        return { [`statusCollection-${params.name}`]: response.status };
    }

    async getPreviewData(params :collectionParams) {
        let response;
        try {
            response = await Ajax.get(API.recommendation)  as Response;
        } catch (e) {
            return { [`preview-${params.name}`]: mockPrewiew() };
        }

        if (response.status === 200) {
            return { [`preview-${params.name}`]: response.body };
        }

        return { [`statusPreview-${params.name}`]: response.status };
    }
}

export const reducerCommonComponents = new ReducerCommonComponents();
