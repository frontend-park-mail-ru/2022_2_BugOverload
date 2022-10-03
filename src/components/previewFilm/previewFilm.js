import { Ajax } from '../../utils/ajax.js';
import { renderTemplate } from '../../utils/render_template.js';
import { BACKEND_API, ROOT } from '../../config/config.js';

export class PreviewFilm {
    render() {
        const promiseCollection = Ajax.get(BACKEND_API.previewFilm);
        promiseCollection.then((response) => {
            if (response.status === 200) {
                renderPreviewFilm(response.body);
                return;
            }

            if (response.status > 500) {
                // TODO
                throw 500;
            }

            throw 'PreviewFilm: Unexpected status';
        });
    }
}

function renderPreviewFilm(previewData) {
    renderTemplate('components/previewFilm/previewFilm', ROOT, 'beforeend', previewData);
}
