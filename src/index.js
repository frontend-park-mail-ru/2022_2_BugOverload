// import {Header} from './components/Header/header.js';

// const header = new Header();
// header.render();

// const previewDune = {
//     previewTittle: "Американская история X",
//     previewDescription: "Ну типо по пустыням ходят, а ещё черви там всякие делают уууу",
//     previewImg: "asserts/img/dune.jpg"}

const previewStarWars = {
    previewTittle: "Звёздные войны. Эпизод IV: Новая надежда",
    previewDescription: `Может хватит бухтеть и дестабилизировать ситуацию в стране?
    Есть инфа от знающего человека, что у нас в стране скоро ожидаются реальные изменения. После того, как стабилизируют ситуацию в Сирии, уничтожат ИГИЛ. Тогда везде и сформируют торговый альянс со средним востоком. Нефть поднимут и будут держать, Европа ничего не сможет сделать. Сейчас главное не бухтеть.
    А теперь самое главное!
    От нас требуется сидеть тихо. После того, как все сделают, все будет у нас хорошо. Всем устроят довольствие, как Саудовским гражданам - каждый будет кататься в масле. Главное сейчас сидеть тихо и не суетиться. Никаких митингов, никаких навальных. Просто переждать и всё будет хорошо, там все схвачено....
    Световой меч делает вжух-вжух`,
    previewImg: "asserts/img/StarWars.jpeg"}

// const collectionCinemaTodayData = {
//     tittle: "Сейчас в кино",
//     films:[
//     {
//         tittle: "Дюна",
//         poster: "asserts/img/posters/dune_poster.jpg",
//         rating: 7.1,
//         genrys: ["Фентези,", "Приключения"],
//         year: 2021,
//         href: "index.html",
//     },
//     {
//         tittle: "Человек",
//         poster: "asserts/img/posters/1.png",
//         rating: 8.7,
//         genrys: ["Документальный,", "Смотрю и плачу"],
//         year: 2015,
//         href: "index.html",
//     },
//     {
//         tittle: "Люси",
//         poster: "asserts/img/posters/2.png",
//         rating: 6.2,
//         genrys: ["Фантастика, Боевик"],
//         year: 2014,
//         href: "index.html",
//     },
//     {
//         tittle: "Властелин колец. Братство кольца",
//         poster: "asserts/img/posters/3.png",
//         rating: 7.5,
//         genrys: ["Фентези,", "Прилючения"],
//         year: 2001,
//         href: "index.html",
//     },
//     {
//         tittle: "Дом, который построил Джек",
//         poster: "asserts/img/posters/4.png",
//         rating: 4.9,
//         genrys: ["Триллер", "Криминал"],
//         year: 2018,
//         href: "index.html",
//     },
//     {
//         tittle: "Доказательство смерти",
//         poster: "asserts/img/posters/5.png",
//         rating: 7.2,
//         genrys: ["Триллер", "Боевик"],
//         year: 2007,
//         href: "index.html",
//     },
// ]};

const collectionPopularData = {
    tittle: "Популярное",
    films:[
        {
            tittle: "Дюна",
            poster: "asserts/img/posters/dune_poster.jpg",
            rating: 6.8,
            genrys: ["Триллер", "Криминал"],
            year: 2021,
            href: "index.html",
        },
        {
            tittle: "Убить Билла",
            poster: "asserts/img/posters/8.png",
            rating: 8.7,
            genrys: ["Триллер", "Криминал"],
            year: 2015,
            href: "index.html",
        },
        {
            tittle: "Головокружение",
            poster: "asserts/img/posters/9.png",
            rating: 7.4,
            genrys: ["Триллер", "Криминал"],
            year: 2014,
            href: "index.html",
        },
        {
            tittle: "Доказательство смерти",
            poster: "asserts/img/posters/5.png",
            rating: 7.5,
            genrys: ["Триллер", "Криминал"],
            year: 2001,
            href: "index.html",
        },
        {
            tittle: "Чунгингский экспресс",
            poster: "asserts/img/posters/7.png",
            rating: 6.9,
            genrys: ["Триллер", "Криминал"],
            year: 2018,
            href: "index.html",
        },
        {
            tittle: "Девушка с татуировой дракона",
            poster: "asserts/img/posters/6.png",
            rating: 5.1 ,
            genrys: ["Триллер", "Криминал"],
            year: 2007,
            href: "index.html",
        },
]};


let root = document.getElementById('root');

let navbar = Handlebars.templates['navbar']({});
let div = document.createElement('div');
div.innerHTML = navbar;
root.append(div);

renderPreviewFilm()
renderCollectionsOnMainPage()


async function renderPreviewFilm() {
    let response = await fetch('http://localhost:3001/v1/preview_film', {credentials: 'include'});
    let previewDune = await response.json();

    let previewFilm = Handlebars.templates['preview_film'](previewDune);
    let div = document.createElement('div');
    div.innerHTML = previewFilm;
    div.style.backgroundImage = `url('${previewDune.previewImg}')`;
    root.append(div);
}

async function renderCollectionsOnMainPage() {
    let response = await fetch('http://localhost:3001/v1/popular_films', {credentials: 'include'});
    let collectionCinemaTodayData = await response.json();
    root.append(renderCollection(collectionCinemaTodayData));

    root.append(renderCollection(collectionPopularData));
}

function renderCollection(filmsData) {
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

    return div;
}
