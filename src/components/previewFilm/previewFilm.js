export const PREVIEW_API = 'http://localhost:8081/v1/recommendation_film';

export class PreviewFilm {
    render() {
        getDataToPreviewFilm().then(data => {
            this.filmData = data;
            renderPreviewFilm(this.filmData);
        });
    }
}

async function getDataToPreviewFilm() {
    let response = await fetch(PREVIEW_API, {
        mode: 'cors',
        credentials: 'include'
    });

    let previewData = await response.json();

    return previewData;
}

function renderPreviewFilm(previewData) {
    let previewFilm = Handlebars.templates['components/previewFilm/previewFilm'](previewData);
    let div = document.createElement('div');

    div.innerHTML = previewFilm;
    div.style.backgroundImage = `url('${previewData.previewImg}')`;

    root.append(div);
}
