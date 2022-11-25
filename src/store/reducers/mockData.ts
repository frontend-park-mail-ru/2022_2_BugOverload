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
    best_films: mockFilms(),
    images: ['/assets/img/default/noPersonImg.webp',
        '/assets/img/default/noPersonImg.webp',
        '/assets/img/default/noPersonImg.webp',
        '/assets/img/default/noPersonImg.webp',
        '/assets/img/default/noPersonImg.webp'],
});

export const mockCollection = () => ({
    name: 'Название коллекции',
    films: mockFilms(),
});

export const mockPremieres = () => ({
    'description': 'Здесь вы можете посмотреть новинки кинопроката',
    'films': [
      {
        'description': 'Британская лингвистка Алетея прилетает из Лондона',
        'directors': [
          {
            'id': 123123,
            'name': 'Стивен Спилберг'
          }
        ],
        'duration_minutes': 55,
        'genres': [
          'фэнтези',
          'приключения'
        ],
        'id': 23,
        'name': 'Game of Thrones',
        'poster_ver': 'default',
        'prod_countries': [
          'США',
          'Великобритания'
        ],
        'prod_date': '2014.01.13',
        'rating': 9.2
      }
    ],
    'name': 'Сейчас в кино'
});
export const mockSearch = () => ({
    films: [{
        description: "Британская лингвистка Алетея прилетает из Лондона",
        directors: [
          {
            id: 123123,
            name: "Стивен Спилберг"
          }
        ],
        duration_minutes: 55,
        genres: [
          "фэнтези",
          "приключения"
        ],
        id: 23,
        name: "Game of Thrones s.1",
        poster_ver: "23",
        prod_countries: [
          "США",
          "Великобритания"
        ],
        prod_date: "2014.01.13",
        rating: 9.2
      }, {
        description: "Британская лингвистка Алетея прилетает из Лондона",
        directors: [
          {
            id: 123123,
            name: "Стивен Спилберг"
          }
        ],
        duration_minutes: 55,
        genres: [
          "фэнтези",
          "приключения"
        ],
        id: 24,
        name: "Game of Thrones s.2",
        poster_ver: "24",
        prod_countries: [
          "США",
          "Великобритания"
        ],
        prod_date: "2014.01.13",
        rating: 9.2
      }],
    serials: [{
        description: "Британская лингвистка Алетея прилетает из Лондона",
        directors: [
          {
            id: 123123,
            name: "Стивен Спилберг"
          }
        ],
        duration_minutes: 55,
        genres: [
          "фэнтези",
          "приключения"
        ],
        id: 25,
        name: "Game of Thrones s.3",
        poster_ver: "25",
        prod_countries: [
          "США",
          "Великобритания"
        ],
        prod_date: "2014.01.13",
        rating: 9.2
      }, {
        description: "Британская лингвистка Алетея прилетает из Лондона",
        directors: [
          {
            id: 123123,
            name: "Стивен Спилберг"
          }
        ],
        duration_minutes: 55,
        genres: [
          "фэнтези",
          "приключения"
        ],
        id: 26,
        name: "Game of Thrones s.4",
        poster_ver: "26",
        prod_countries: [
          "США",
          "Великобритания"
        ],
        prod_date: "2014.01.13",
        rating: 9.2
      }],
    persons: [
        {
            id: 27,
            name: 'Василий Петров',
            avatar: '27',
            birthday: '1978.02.21',
            professions: [
                "актер",
                "продюсер",
                "режиссер"
            ],
            count_films: 130,
        },
        {
            id: 30,
            name: 'Кристина Асмус',
            avatar: '30',
            birthday: '1986.02.21',
            professions: [
                "актер",
                "продюсер",
                "режиссер"
            ],
            count_films: 322,
        },
        {
            id: 12,
            name: 'Светлана Хотченкова',
            avatar: '12',
            birthday: '1991.02.21',
            professions: [
                "актер",
                "продюсер",
                "режиссер"
            ],
            count_films: 112,
        },
        {
            id: 26,
            name: 'Фёдор Добронравов',
            avatar: '26',
            birthday: '1938.02.21',
            professions: [
                "актер",
                "продюсер",
                "Пьяница"
            ],
            count_films: 11,
        }
    ],
});
