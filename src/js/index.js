const previewDune = {
    previewTittle: "Американская история X",
    previewDescription: "Ну типо по пустыням ходят, а ещё черви там всякие делают уууу",
    previewImg: "img/dune.jpg"}

const previewStarWars = {
    previewTittle: "Звёздные войны. Эпизод IV: Новая надежда",
    previewDescription: "Ну типо космическая войнушка, световой меч делает вжух-вжух",
    previewImg: "img/StarWars.jpeg"}

const collectionCinemaTodayData = {
    tittle: "Сейчас в кино",
    films:[
    {
        tittle: "Дюна",
        poster: "img/posters/dune_poster.jpg",
        rating: 7.1,
        genrys: ["Фентези,", "Приключения"],
        year: 2021,
        href: "index.html",
    },
    {
        tittle: "Человек",
        poster: "img/posters/1.png",
        rating: 8.7,
        genrys: ["Документальный,", "Смотрю и плачу"],
        year: 2015,
        href: "index.html",
    },
    {
        tittle: "Люси",
        poster: "img/posters/2.png",
        rating: 7.4,
        genrys: ["Фантастика, Боевик"],
        year: 2014,
        href: "index.html",
    },
    {
        tittle: "Властелин колец. Братство кольца",
        poster: "img/posters/3.png",
        rating: 7.5,
        genrys: ["Фентези,", "Прилючения"],
        year: 2001,
        href: "index.html",
    },
    {
        tittle: "Дом, который построил Джек",
        poster: "img/posters/4.png",
        rating: 7.9,
        genrys: ["Триллер", "Криминал"],
        year: 2018,
        href: "index.html",
    },
    {
        tittle: "Доказательство смерти",
        poster: "img/posters/5.png",
        rating: 7.2,
        genrys: ["Триллер", "Боевик"],
        year: 2007,
        href: "index.html",
    },
]};


const collectionPopularData = {
    tittle: "Популярное",
    films:[
        {
            tittle: "Дюна",
            poster: "img/posters/dune_poster.jpg",
            rating: 7.1,
            genrys: ["Триллер", "Криминал"],
            year: 2021,
            href: "index.html",
        },
        {
            tittle: "Убить Билла",
            poster: "img/posters/8.png",
            rating: 8.7,
            genrys: ["Триллер", "Криминал"],
            year: 2015,
            href: "index.html",
        },
        {
            tittle: "Головокружение",
            poster: "img/posters/9.png",
            rating: 7.4,
            genrys: ["Триллер", "Криминал"],
            year: 2014,
            href: "index.html",
        },
        {
            tittle: "Доказательство смерти",
            poster: "img/posters/5.png",
            rating: 7.5,
            genrys: ["Триллер", "Криминал"],
            year: 2001,
            href: "index.html",
        },
        {
            tittle: "Чунгингский экспресс",
            poster: "img/posters/7.png",
            rating: 7.9,
            genrys: ["Триллер", "Криминал"],
            year: 2018,
            href: "index.html",
        },
        {
            tittle: "Девушка с татуировой дракона",
            poster: "img/posters/6.png",
            rating: 7.2,
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

let previewFilm = Handlebars.templates['previewFilm'](previewStarWars);
div = document.createElement('div');
div.innerHTML = previewFilm;
div.style.backgroundImage = `url('${previewStarWars.previewImg}')`;
root.append(div);

let collectionCinemaToday = Handlebars.templates['collection'](collectionCinemaTodayData);
div = document.createElement('div');
div.innerHTML = collectionCinemaToday;
root.append(div)

let collectionPopular = Handlebars.templates['collection'](collectionPopularData);
div = document.createElement('div');
div.innerHTML = collectionPopular;
root.append(div)
