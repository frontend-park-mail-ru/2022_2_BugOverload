export class PreviewFilm {
    render() {
        getDataToPreviewFilm().then(data => {
            this.filmData = data;
            renderPreviewFilm(this.filmData);
        });
    }
}

async function getDataToPreviewFilm() {
    let response = await fetch('http://localhost:3001/v1/recommendation_film', {
        credentials: 'include'
    });

    let previewData = await response.json();

    return previewData;
}

function renderPreviewFilm(previewData) {
    let previewFilm = Handlebars.templates['preview_film'](previewData);
    let div = document.createElement('div');

    div.innerHTML = previewFilm;
    div.style.backgroundImage = `url('${previewData.previewImg}')`;

    root.append(div);
}
