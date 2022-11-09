const mockFilms = () => {
    return [
        {
            id: -1,
            name: "Фильм",
            description: "",
            type: "",
            prod_year: 2021,
            prodCompany: "",
            prodCountry: "",
            ageLimit: "",
            duration: "",
            posterHuge: "",
            poster_ver: "assets/default/noFilm.webp",
            rating: 9.8,
            genres: ["Жанры"],
        },
    ];
}

export const mockFilm = () => {
    return {
		"actors": [
		  {
			"character": "Персонаж",
            "id": -1,
			"name": "Актёр"
		  },
          {
			"character": "Персонаж",
            "id": -1,
			"name": "Актёр"
		  },
          {
			"character": "Персонаж",
            "id": -1,
			"name": "Актёр"
		  },
          {
			"character": "Персонаж",
            "id": -1,
			"name": "Актёр"
		  },
		],
		"directors": [
			{
              "id": -1,
			  "name": "Режиссёр"
			},
            {
                "id": -1,
                "name": "Режиссёр"
            },
		  ],
		  "composers": [
			{
              "id": -1,
			  "name": "Композитор"
			}
		  ],
		  "operators": [
			{
              "id": -1,
			  "name": "Оператор"
			}
		  ],
		  "montage": [
			{
              "id": -1,
			  "name": "Монтажёр"
			}
		  ],
		  "writers": [
			{
              "id": -1,
			  "name": "Сценарист"
			}
		  ],
		  "producers": [
			{
               "id": -1,
			  "name": "Продюссер"
			}
		  ],
		short_description: 'Краткое описание',

        "id": -1,
		"rating": 10,
		"slogan": "Слоган",
		"type": "film", 
		"age_limit": 18,
		"box_office": 60000000,
		"budget": 18323222,
		"count_actors": 783,
		"count_seasons": 11,
		"currency_budget": "USD",
		"description": "Описание",
		"duration": 249,
		"prod_year": 2011,
		"end_year": 2019,
		"name": "Название",
		"original_name": "Оригинальное название",
		"poster_hor": 'assets/img/films_hor/trueDetective.jpg',

		"genres": [
			"жанры"
		  ],
		"prod_companies": [
		  "Компания"
		],
		"prod_countries": [
		  "Страна",
		],
	};
}

export const mockPerson = () => {
    return {
		name: 'Человек',
		original_name: 'Оригинальное имя',
		professions: [
			'профессия',
		],
		birthday: '09.10.2022, 48 лет',
		growth: '1.83 м',
		count_films: 'Количество фильмов',
		avatar: "1",
		best_films: mockFilms(),
	}
}

export const mockCollection = () => {
    return {
        name: "Название коллекции",
        films: mockFilms(),
    }
}
