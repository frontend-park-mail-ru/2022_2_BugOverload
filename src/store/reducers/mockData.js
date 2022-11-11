export const mockPrewiew = () => ({
    id: 0,
    name: 'Название',
    origin_name: '',
    short_description: 'Небольшое описание',
    type: '',
    prod_year: 1968,
    prodCompany: '',
    prodCountry: '',
    ageLimit: '',
    poster_hor: 'default',
    rating: 7.1,
    genres: ['Жанры'],
});

export const mockFilm = () => ({
    short_description: 'Краткое описание',

    id: 0,
    rating: 10,
    slogan: 'Слоган',
    type: 'film',
    age_limit: 18,
    box_office: 60000000,
    budget: 18323222,
    count_actors: 783,
    count_seasons: 11,
    currency_budget: 'USD',
    description: 'Описание',
    duration: 249,
    prod_year: 2011,
    end_year: 2019,
    name: 'Название',
    original_name: 'Оригинальное название',
    poster_hor: 'default',

    genres: [
        'жанры',
    ],
    prod_companies: [
        'Компания',
    ],
    prod_countries: [
        'Страна',
    ],
});

export const mockPerson = () => ({
    name: 'Человек',
    original_name: 'Оригинальное имя',
    professions: [
        'профессия',
    ],
    birthday: '09.10.2022, 48 лет',
    growth: '1.83 м',
    count_films: 'Количество фильмов',
    avatar: '/assets/img/default/noPerson.webp',
    images: ['/assets/img/default/noPersonImg.webp',
        '/assets/img/default/noPersonImg.webp',
        '/assets/img/default/noPersonImg.webp',
        '/assets/img/default/noPersonImg.webp',
        '/assets/img/default/noPersonImg.webp'],
});

export const mockCollection = () => ({
    name: 'Название коллекции',
});
