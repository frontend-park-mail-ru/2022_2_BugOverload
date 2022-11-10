const mockFilms = () => [
    {
        id: 0,
        name: 'Фильм',
        description: '',
        type: '',
        prod_year: 2021,
        prodCompany: '',
        prodCountry: '',
        ageLimit: '',
        duration: '',
        posterHuge: '',
        poster_ver: 'default',
        rating: 9.8,
        genres: ['Жанры'],
    },
    {
        id: 0,
        name: 'Фильм',
        description: '',
        type: '',
        prod_year: 2020,
        prodCompany: '',
        prodCountry: '',
        ageLimit: '',
        duration: '',
        posterHuge: '',
        poster_ver: 'default',
        rating: 7.8,
        genres: ['Жанры'],
    },
    {
        id: 0,
        name: 'Фильм',
        description: '',
        type: '',
        prod_year: 2022,
        prodCompany: '',
        prodCountry: '',
        ageLimit: '',
        duration: '',
        posterHuge: '',
        poster_ver: 'default',
        rating: 6.8,
        genres: ['Жанры'],
    },
    {
        id: 0,
        name: 'Фильм',
        description: '',
        type: '',
        prod_year: 2022,
        prodCompany: '',
        prodCountry: '',
        ageLimit: '',
        duration: '',
        posterHuge: '',
        poster_ver: 'default',
        rating: 6.8,
        genres: ['Жанры'],
    },
    {
        id: 0,
        name: 'Фильм',
        description: '',
        type: '',
        prod_year: 2022,
        prodCompany: '',
        prodCountry: '',
        ageLimit: '',
        duration: '',
        posterHuge: '',
        poster_ver: 'default',
        rating: 6.8,
        genres: ['Жанры'],
    },
];

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
    actors: [
        {
            character: 'Персонаж',
            id: 0,
            name: 'Актёр',
            avatar: 'default',
        },
        {
            character: 'Персонаж',
            id: 0,
            name: 'Актёр',
            avatar: 'default',
        },
        {
            character: 'Персонаж',
            id: 0,
            name: 'Актёр',
            avatar: 'default',
        },
        {
            character: 'Персонаж',
            id: 0,
            name: 'Актёр',
            avatar: 'default',
        },
    ],
    directors: [
        {
            id: 0,
            name: 'Режиссёр',
        },
        {
            id: 0,
            name: 'Режиссёр',
        },
    ],
    composers: [
        {
            id: 0,
            name: 'Композитор',
        },
    ],
    operators: [
        {
            id: 0,
            name: 'Оператор',
        },
    ],
    montage: [
        {
            id: 0,
            name: 'Монтажёр',
        },
    ],
    writers: [
        {
            id: 0,
            name: 'Сценарист',
        },
    ],
    producers: [
        {
            id: 0,
            name: 'Продюссер',
        },
    ],
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
    avatar: 'default',
    best_films: mockFilms(),
    images: ['1', '2', '3', '4', '5'],
});

export const mockCollection = () => ({
    name: 'Название коллекции',
    films: mockFilms(),
});
