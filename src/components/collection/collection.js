export const COLLECTION_TYPE = {
    popular: "popular",
    todayInCinema: "todayInCinema",
}

export const COLLECTION_API = {
    popular: 'http://localhost:3001/v1/popular_films',
    todayInCinema: 'http://localhost:3001/v1/in_cinema',
}


export class Collection {
    #type;

    constructor(type) {
        this.#type = type;
    }

    render() {
        getDataToCollection(this.#type).then(data => {
            this.collectionData = data;
            debugger;
            renderCollection(this.collectionData);
        });
    }
}

async function getDataToCollection(type) {
    debugger;
    switch (type) {
        case COLLECTION_TYPE.popular: {
            let response = await fetch(COLLECTION_API.popular, {
                cors: true,
                credentials: 'include'
            });
            let collectionCinemaTodayData = await response.json();

            return collectionCinemaTodayData;
        }

        case COLLECTION_TYPE.todayInCinema: {
            let response = await fetch(COLLECTION_API.todayInCinema, {
                cors: true,
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
    debugger;
    if (!filmsData) {
        return;
    }

    let collection = Handlebars.templates['collection'](filmsData);
    let div = document.createElement('div');
    div.innerHTML = collection;

    let ratingElem = div.querySelectorAll('.film__rating');

    ratingElem.forEach((elem, index) => {
        let ratingValue = filmsData.films[index].rating;

        if (ratingValue > 7.49) {
            elem.dataset.valueRating = 'positive';
            return;
        }

        if (ratingValue > 5.19) {
            elem.dataset.valueRating = 'neutral';
            return;
        }

        elem.dataset.valueRating = 'negotive';
    })

    root.append(div);
}
