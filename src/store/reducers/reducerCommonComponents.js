import { Ajax } from '@utils/ajax.js';
import { API } from '@config/config.js';

class ReducerCommonComponents {
    async getCollectionData(params) {
        const response = await Ajax.get(API.collection(params.tag));
        if (response.status === 200) {
            return { [`collection-${params.name}`]: response.body };
        }

        return { [`statusCollection-${params.name}`]: response.status };
    }

    async getPreviewData(params) {
        const response = await Ajax.get(API.recommendation_film);
        if (response.status === 200) {
            return { [`preview-${params.name}`]: response.body };
        }

        return { [`statusPreview-${params.name}`]: response.status };
    }
}

export const reducerCommonComponents = new ReducerCommonComponents();