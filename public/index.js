
// addElementFromTemplate(root, 'navbar', {})
// addElementFromTemplate(header, 'bigContent', {})

// let main = document.createElement('')

const collectionCinemaTodayData = {
    tittle: "Сейчас в кино",
    films:[
    {
        tittle: "Дюна",
        poster: "img/posters/dune_poster.jpg",
        rating: 7.1,
        genrys: "Фентези, Приключения",
        year: 2015,
        href: "index.html",
    },
    {
        tittle: "Дюна",
        poster: "img/posters/1.png",
        rating: 7.3,
        genrys: "Фентези, Приключения",
        year: 2015,
        href: "index.html",
    },
    {
        tittle: "Дюна",
        poster: "img/posters/2.png",
        rating: 7.4,
        genrys: "Фентези, Приключения",
        year: 2015,
        href: "index.html",
    },
    {
        tittle: "Дюна",
        poster: "img/posters/3.png",
        rating: 7.5,
        genrys: "Фентези, Приключения",
        year: 2015,
        href: "index.html",
    },
    {
        tittle: "Дюна",
        poster: "img/posters/4.png",
        rating: 7.9,
        genrys: "Фентези, Приключения",
        year: 2015,
        href: "index.html",
    },
    {
        tittle: "Дюна",
        poster: "img/posters/5.png",
        rating: 7.2,
        genrys: "Фентези, Приключения",
        year: 2015,
        href: "index.html",
    },
]}


const collectionPopularData = {films:[
    {
        tittle: "Дюна",
        poster: "dune_poster.jpg",
        rating: 7.1,
        genrys: ["Фентези", "Приключения"],
        year: 2015
    },
    {
        tittle: "Дюна",
        poster: "1.png",
        rating: 7.2,
        genrys: ["Фентези", "Приключения"],
        year: 2015
    },
    {
        tittle: "Дюна",
        poster: "2.png",
        rating: 7.2,
        genrys: ["Фентези", "Приключения"],
        year: 2015
    },
    {
        tittle: "Дюна",
        poster: "3.png",
        rating: 7.2,
        genrys: ["Фентези", "Приключения"],
        year: 2015
    },
    {
        tittle: "Дюна",
        poster: "4.png",
        rating: 7.2,
        genrys: ["Фентези", "Приключения"],
        year: 2015
    },
    {
        tittle: "Дюна",
        poster: "5.png",
        rating: 7.2,
        genrys: ["Фентези", "Приключения"],
        year: 2015
    },
]}

let root = document.getElementById('root')

let navbar = Handlebars.templates['navbar']({})
let div = document.createElement('div')
div.innerHTML = navbar

root.append(div)

let previewFilm = Handlebars.templates['previewFilm']({})
div = document.createElement('div')
div.innerHTML = previewFilm

root.append(div)

let collectionCinemaToday = Handlebars.templates['collection'](collectionCinemaTodayData)
div = document.createElement('div')
div.innerHTML = collectionCinemaToday

root.append(div)

// let collectionPopular = Handlebars.templates['collection']({})
// div = document.createElement('div')
// div.innerHTML = collectionPopular

// root.append(div)

// function renderTemplate(templateName, callback, parametrs = {}) {
//     const template = Handlebars.templates[templateName];
//     const templateHtml = template(parametrs);
//     const safeheaderHtml = DOMPurify.sanitize(templateHtml);
//     callback(safeheaderHtml);
// }

// function addElementFromTemplate(elementDOM, templateName, context) {
//     // let renderTemplate = Handlebars.templates[templateName]
//     // let html = renderTemplate(context)
//     let html = Handlebars.templates[templateName](context)
//     let div = document.createElement('div')
//     // const sanitizer = new Sanitizer();
//     // div.setHTML(html, {sanitizer})
//     div.innerHTML = html

//     // const elem = document.getElementById(element);
//     elementDOM.append(div);
// }
