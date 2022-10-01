export const COLLECTION_TYPE = {
    popular: "popular",
    todayInCinema: "todayInCinema",
}

export const COLLECTION_API = {
    popular: 'http://localhost:8081/v1/popular_films',
    todayInCinema: 'http://localhost:8081/v1/in_cinema',
}


export class Collection {
    #type;

    constructor(type) {
        this.#type = type;
    }

    render() {
        getDataForCollection(this.#type).then(data => {
            this.collectionData = data;
            renderCollection(this.collectionData);
        });
    }
}

async function getDataForCollection(type) {
    switch (type) {
        case COLLECTION_TYPE.popular: {
            let response = await fetch(COLLECTION_API.popular, {
                mode: 'cors',
                credentials: 'include'
            });
            let collectionCinemaTodayData = await response.json();

            return collectionCinemaTodayData;
        }

        case COLLECTION_TYPE.todayInCinema: {
            let response = await fetch(COLLECTION_API.todayInCinema, {
                mode: 'cors',
                credentials: 'include'
            });
            let collectionCinemaTodayData = await response.json();

            return collectionCinemaTodayData;
        }

        default:
            if (+type) {
                alert(`ID COLLECTION ${+type}`);
            }
    }
}

function renderCollection(filmsData) {
    if (!filmsData) {
        return;
    }

    decorateGenresFilm(filmsData);

    let films = "";
    filmsData.films.forEach(filmData => films += Handlebars.templates['components/film/film'](filmData) )

    let collection = Handlebars.templates['components/collection/collection']({title: filmsData.title, films: films});
    let div = document.createElement('div');
    div.innerHTML = collection;

    addColorRatingFilm(div, filmsData);


    root.append(div);
}

function decorateGenresFilm(filmsData) {
    filmsData.films.forEach((film) => {
        for (let i = 0; i < film.genres.length - 1; ++i) {
            film.genres[i] += ',';
        }
    })
}

function addColorRatingFilm(div, filmsData) {
    let ratingElem = div.querySelectorAll('.film__rating');

    ratingElem.forEach((film, index) => {
        let ratingValue = filmsData.films[index].rating;

        if (ratingValue > 7.49) {
            film.dataset.valueRating = 'positive';
            return;
        }

        if (ratingValue > 5.19) {
            film.dataset.valueRating = 'neutral';
            return;
        }

        film.dataset.valueRating = 'negotive';
    })
}
