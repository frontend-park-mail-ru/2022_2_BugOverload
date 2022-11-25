import { Ajax } from '@utils/ajax';
import { API, responsStatuses } from '@config/config';
import { mockCollection, mockPrewiew } from '@store/reducers/mockData';

class ReducerCommon {
    async getCollectionData({name, target, key, sortParam, countFilms, delimiter} :collectionParams) {
        let response;
        try {
            response = await Ajax.get(API.collection(target, key, sortParam, countFilms, delimiter)) as Response;
        } catch (e) {
            return { [`${name}`]: mockCollection() };
        }
        if (response.status === responsStatuses.OK) {
            console.log(`${name}`)
            return { [`${name}`]: response.body };
        }
      return { [`statusCollection-${name}`]: response.status };
  }

    async getPreviewData({name} :collectionParams) {
        let response;
        try {
            response = await Ajax.get(API.recommendation) as Response;
        } catch (e) {
            return { [`preview-${name}`]: mockPrewiew() };
        }

        if (response.status === responsStatuses.OK) {
            return { [`preview-${name}`]: response.body };
        }

        return { [`statusPreview-${name}`]: response.status };
    }

    async getSearchData({request}: searchParams) {
        // const response = await Ajax.get(API.search(request)) as Response;

        // if (response.status === responsStatuses.OK) {
            // return { search: response.body };

            // фальшивkа
          if (request === 'qwe') {
            console.log(`getSearchData ${request}`)
            return { search:
                {
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
                        poster_ver: "{{key}}",
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
                        id: 23,
                        name: "Game of Thrones s.2",
                        poster_ver: "{{key}}",
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
                        id: 23,
                        name: "Game of Thrones s.3",
                        poster_ver: "{{key}}",
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
                        id: 23,
                        name: "Game of Thrones s.4",
                        poster_ver: "{{key}}",
                        prod_countries: [
                          "США",
                          "Великобритания"
                        ],
                        prod_date: "2014.01.13",
                        rating: 9.2
                      }],
                    persons: [
                        {
                            id: 123,
                            name: 'Василий Петров',
                            avatar: 'assets/img/actor_photos/KBeil.png',
                            birthday: '1978.02.21',
                            professions: [
                                "актер",
                                "продюсер",
                                "режиссер"
                            ],
                            count_films: 130,
                        },
                        {
                            id: 124,
                            name: 'Кристина Асмус',
                            avatar: 'assets/img/actor_photos/KBeil.png',
                            birthday: '1986.02.21',
                            professions: [
                                "актер",
                                "продюсер",
                                "режиссер"
                            ],
                            count_films: 322,
                        },
                        {
                            id: 125,
                            name: 'Светлана Хотченкова',
                            avatar: 'assets/img/actor_photos/KBeil.png',
                            birthday: '1991.02.21',
                            professions: [
                                "актер",
                                "продюсер",
                                "режиссер"
                            ],
                            count_films: 112,
                        },
                        {
                            id: 126,
                            name: 'Фёдор Добронравов',
                            avatar: 'assets/img/actor_photos/KBeil.png',
                            birthday: '1938.02.21',
                            professions: [
                                "актер",
                                "продюсер",
                                "Пьяница"
                            ],
                            count_films: 11,
                        }
                    ],
                }
            }
          }
        // }
        console.log(`getSearchData : nothing`)
        return { search: { error: 'error' } };
    }
}

export const reducerCommon = new ReducerCommon();
