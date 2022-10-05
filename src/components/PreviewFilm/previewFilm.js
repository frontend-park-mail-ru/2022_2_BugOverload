import { Ajax } from '../../utils/ajax.js';
import { renderTemplate } from '../../utils/render_template.js';
import { BACKEND_API, ROOT } from '../../config/config.js';

export class PreviewFilm {
    init() {
        return Ajax.get(BACKEND_API.previewFilm);
    }

    render(response) {
        if (response.status === 200) {
            // renderPreviewFilm(response.body);
            // debugger;
            return Handlebars.templates['components/PreviewFilm/previewFilm'](response.body);
            // return;
        }

        if (response.status > 500) {
            // TODO
            throw new Error(500);
        }

        throw new Error('PreviewFilm: Unexpected status');
    }
}

function renderPreviewFilm(previewData) {
    return previewData;
    // renderTemplate('components/PreviewFilm/previewFilm', ROOT, 'beforeend', previewData);
    // const template = Handlebars.templates[templateName];
    // const templateHtml = template(props);
    // target.insertAdjacentHTML(place, templateHtml)
}
