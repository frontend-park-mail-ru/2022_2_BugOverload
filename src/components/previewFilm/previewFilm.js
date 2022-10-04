import { Ajax } from '../../utils/ajax.js';
import { renderTemplate } from '../../utils/render_template.js';
import { BACKEND_API, ROOT } from '../../config/config.js';

export class PreviewFilm {
    init() {
        return Ajax.get(BACKEND_API.previewFilm);
    }

    render(response) {
        if (response.status === 200) {
            renderPreviewFilm(response.body);
            return;
        }

        if (response.status > 500) {
            // TODO
            throw new Error(500);
        }

        throw new Error('PreviewFilm: Unexpected status');
    }
}

function renderPreviewFilm(previewData) {
    renderTemplate('components/previewFilm/previewFilm', ROOT, 'beforeend', previewData);
}
