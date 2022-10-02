<<<<<<< HEAD
import { Ajax } from '../../utils/ajax.js';
import { renderTemplate } from '../../utils/render_template.js';
import { ROOT } from '../../utils/root.js';

export const PREVIEW_API = '/v1/recommendation_film';
=======
export const PREVIEW_API = 'http://127.0.0.1:3000/v1/recommendation_film';
>>>>>>> origin/merge_header

export class PreviewFilm {
    render() {
        let promiseCollection = Ajax.get(PREVIEW_API);
        promiseCollection.then( (response) => {
            if (response.status === 200) {
                renderPreviewFilm(response.body);
                return;
            }

            if (response.status > 500) {
                //TODO
                throw 500;
            }

            throw 'PreviewFilm: Unexpected status'
        });
    }
}

function renderPreviewFilm(previewData) {
    renderTemplate('components/previewFilm/previewFilm', ROOT, 'beforeend', previewData);
}
