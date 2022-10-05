import { Ajax } from '../../utils/ajax.js';
import { BACKEND_API } from '../../config/config.js';

export class PreviewFilm {
    async getRequestData() {
        const response = await Ajax.get(BACKEND_API.previewFilm);
        if (response.status === 200) {
            return response.body;
        }

        if (response.status > 500) {
            // TODO
            throw new Error(500);
        }

        throw new Error('PreviewFilm: Unexpected status');
    }

    renderTemplate(data) {
        return Handlebars.templates['components/PreviewFilm/previewFilm'](data);
    }
}
