import { Ajax } from '@utils/ajax.js';
import { API } from '@config/config.js';
import { render404 } from '@router/Page404/page404.js';

class ReducerCommonComponents {
    async getCollectionData(params) {
        let response;
        try {
            response = await Ajax.get(API.collection(params.tag));
        } catch (e) {
            render404();
            return null;
        }
        if (response.status === 200) {
            return { [`collection-${params.name}`]: response.body };
        }

        return { [`statusCollection-${params.name}`]: response.status };
    }

    async getPreviewData(params) {
        const response = wrapperAsync(await Ajax.get(API.recommendation));
        if (response.status === 200) {
            return { [`preview-${params.name}`]: response.body };
        }

        return { [`statusPreview-${params.name}`]: response.status };
    }
}

export const reducerCommonComponents = new ReducerCommonComponents();
