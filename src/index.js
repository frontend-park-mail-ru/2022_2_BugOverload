import { PreviewFilm } from './components/previewFilm/previewFilm.js';
import { Collection } from './components/collection/collection.js';
import { COLLECTION_TYPE } from './components/collection/collection.js';

renderMainPage();


let avatar = document.querySelector('.header__userbar-substrate');
avatar.addEventListener('mouseenter', (event) => {
    let menu = Handlebars.templates['components/navbarMish/usermenu']();
    avatar.innerHTML = menu; //ajasentHTTP
    avatar.style.backgroundColor = "rgba(15, 15, 15, 0.8)";
});

avatar.addEventListener('mouseleave', (event) => {
    avatar.style.backgroundColor = "rgba(15, 15, 15, 0.0)";
    avatar.innerHTML = '<img class="header__avatar" src="asserts/img/invisibleMan.jpeg" alt="">';
});


function renderMainPage() {

    let root = document.getElementById('root');
    let navbar = Handlebars.templates['components/navbarMish/navbar']({});
    let div = document.createElement('div');
    div.innerHTML = navbar;
    root.append(div);

    const previewFilm = new PreviewFilm;
    previewFilm.render();

    showCollectionsOnMainPage();


    function showCollectionsOnMainPage() {
        const collectionPopular = new Collection(COLLECTION_TYPE.todayInCinema);
        collectionPopular.render();

        const collectionCinemaToday = new Collection(COLLECTION_TYPE.popular);
        collectionCinemaToday.render();
    }
}

////
let sliders = document.querySelectorAll('.collection__slider');
sliders.forEach(slider => {
    let btnRight = slider.querySelector('.collection__slider-button_right');
    let btnleft = slider.querySelector('.collection__slider-button_left');

    let offset = 0;
    debugger;
    slider.addEventListener('click', (event) => {
        debugger
        if (event.target === btnRight) {
            event.preventDefault();
            alert(offset + 1);
        }
        return;
    });

    slider.addEventListener('click', (event) => {
        if (event.target === btnleft) {
            event.preventDefault();
            alert(offset + 2);
        }
        return;
    });
})


import {Header} from './components/Header/header.js';

const root = document.getElementById('root');

const header = new Header(root);
header.render();
