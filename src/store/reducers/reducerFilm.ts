import { Ajax } from '@utils/ajax';
import { getDateNow } from '@utils/common';
import { API, responsStatuses } from '@config/config';
import { store } from '@store/Store';
import { mockFilm } from '@store/reducers/mockData';

class ReducerFilm {
    async getFilmData({ id } :{id :number}) {
        let response;
        try {
            response = await Ajax.get(API.film(id)) as Response;
        } catch (e) {
            return { [`film${id}`]: mockFilm() };
        }
        if (response.status === responsStatuses.OK) {
            return { [`film${id}`]: response.body };
        }
        if (response.status === responsStatuses.NotFound) {
            return { notFound: true };
        }

        return { filmStatus: response.status };
    }

    async rate(ratingData :anyObject) {
        const response = await Ajax.post({
            url: API.rate(ratingData.filmID),
            body: { score: +ratingData.rate },
        }) as anyObject;

        if (response.status === responsStatuses.OK) {
            return {
                countScores: response.body?.count_ratings,
                rating: { value: ratingData.rate, dateRating: getDateNow() },
                statusRating: response.status,
            } as anyObject;
        }
        return { statusRating: response.status };
    }

    async deleteRate({ filmID } :{filmID :number} ) {
        const response = await Ajax.delete({
            url: API.del_rate(filmID),
        }) as anyObject;
        if (response.status === responsStatuses.OK) {
            return {
                countScores: response.body?.count_ratings,
                rating: null,
                statusRating: null,
            } as anyObject;
        }
        return { statusRating: response.status };
    }

    async getMetaDataFilm({ filmID } :anyObject) {
        const response = await Ajax.get(API.metaFilm(filmID)) as anyObject;
        if (response.status === responsStatuses.OK) {
            return {
                listCollectionsUser: response.body.collections,
                countScores: store.getState('film')?.count_ratings,
                rating: {
                    value: response.body?.rating,
                    dateRating: response.body?.date_rating?.split(' ')[0].split('.').reverse().join('.'),
                },
                countReviews: response.body.count_reviews,
            };
        }
        return { statusMetaData: response.status };
    }

    async getDataReviews({filmID, count, offset} :anyObject) {
        const response = await Ajax.get(API.reviews(filmID, count, offset)) as Response;
        if (response.status === responsStatuses.OK) {
            return {
                reviews: handlerAvatarReviews(response.body),
            };
        }

        if (response.status === responsStatuses.NotFound
                || response.status === responsStatuses.BadRequest) {
            return {
                reviews: null,
            };
        }
        return { statusReviews: response.status };
    }

    async sendReview(reviewData :anyObject) {
        const response = await Ajax.post({
            url: API.send_review(reviewData.filmID),
            body: reviewData,
        }) as Response;

        if (response.status === responsStatuses.Created) {
            const { avatar, nickname } = store.getState('user');
            const countReviews = (store.getState('countReviews') || 0) + 1;
            const { body, name, type } = reviewData;
            return {
                authorReview: response.body,
                countReviews,
                userReview: {
                    author: {
                        avatar,
                        nickname,
                        count_reviews: countReviews,
                    },
                    body,
                    name,
                    type,
                    create_time: getDateNow(),
                },
                statusSendReview: { status: response.status, type },
            };
        }

        return { statusSendReview: response.status };
    }

    async getPremieresData({countFilms = 20, delimiter = 20}: anyObject) {
        // let response;
        // try {
            const response = await Ajax.get(API.premieres(countFilms, delimiter)) as Response;
        // } catch (e) {
        //     return { premieres: mockPremieres() };
        // }
        // if (response.status === responsStatuses.OK) {
            // return { premieres: response.body.films };
        // }

        // return { premieres: null };
        return { premieres: response.body };
    }
}

export const reducerFilm = new ReducerFilm();

const handlerAvatarReviews = (object :anyObject) => {
    object.forEach((element :any) => {
        element.author.avatar = API.img.user_avatar(element.author.avatar);
    });
    return object;
};

/* [
    {
        id: 12,
        poster_hor: '12',
        name: 'Дюна',
        prod_date: '2022.11.23',
        genres: ['name1', 'name2'],
        prod_countries: ['name1', 'name2'],
        directors: ['singleName'],
        duration: 133,
        rating: 7.6,
        description: 'Едут в поезде японец, грузин и российский либерал. Тут у японца зазвонил вдруг неплохой сенсорный телефон, он поговорил, закончил разговор и выбросил телефон из окна. Грузин и российский либерал с недоумением смотрят на него. Спрашивают: — Ты зачем это сделал? Японец отвечает: — Да у меня дома этого говна навалом. Грузин подхватывает российского либерала и швыряет его в окно'
    },
    {
        id: 13,
        poster_hor: '13',
        name: 'Убить билла',
        prod_date: '2022.11.23',
        genres: ['name1', 'name2'],
        prod_countries: ['name1', 'name2'],
        directors: ['singleName'],
        duration: 133,
        rating: 7.6,
        description: 'Едут в поезде японец, грузин и российский либерал. Тут у японца зазвонил вдруг неплохой сенсорный телефон, он поговорил, закончил разговор и выбросил телефон из окна. Грузин и российский либерал с недоумением смотрят на него. Спрашивают: — Ты зачем это сделал? Японец отвечает: — Да у меня дома этого говна навалом. Грузин подхватывает российского либерала и швыряет его в окно'
    },
    {
        id: 14,
        poster_hor: '14',
        name: 'Люцифер',
        prod_date: '2022.11.25',
        genres: ['name1', 'name2'],
        prod_countries: ['name1', 'name2'],
        directors: ['singleName'],
        duration: 133,
        rating: 7.6,
        description: 'Едут в поезде японец, грузин и российский либерал. Тут у японца зазвонил вдруг неплохой сенсорный телефон, он поговорил, закончил разговор и выбросил телефон из окна. Грузин и российский либерал с недоумением смотрят на него. Спрашивают: — Ты зачем это сделал? Японец отвечает: — Да у меня дома этого говна навалом. Грузин подхватывает российского либерала и швыряет его в окно'
    },
    {
        id: 15,
        poster_hor: '15',
        name: 'Один дома',
        prod_date: '2022.11.27',
        genres: ['name1', 'name2'],
        prod_countries: ['name1', 'name2'],
        directors: ['singleName'],
        duration: 133,
        rating: 7.6,
        description: 'Едут в поезде японец, грузин и российский либерал. Тут у японца зазвонил вдруг неплохой сенсорный телефон, он поговорил, закончил разговор и выбросил телефон из окна. Грузин и российский либерал с недоумением смотрят на него. Спрашивают: — Ты зачем это сделал? Японец отвечает: — Да у меня дома этого говна навалом. Грузин подхватывает российского либерала и швыряет его в окно'
    },
    {
        id: 16,
        poster_hor: '16',
        name: 'Душа',
        prod_date: '2022.11.27',
        genres: ['name1', 'name2'],
        prod_countries: ['name1', 'name2'],
        directors: ['singleName'],
        duration: 133,
        rating: 7.6,
        description: 'Едут в поезде японец, грузин и российский либерал. Тут у японца зазвонил вдруг неплохой сенсорный телефон, он поговорил, закончил разговор и выбросил телефон из окна. Грузин и российский либерал с недоумением смотрят на него. Спрашивают: — Ты зачем это сделал? Японец отвечает: — Да у меня дома этого говна навалом. Грузин подхватывает российского либерала и швыряет его в окно'
    },
    {
        "description": "Британская лингвистка Алетея прилетает из Лондона",
        "directors": [
          {
            "id": 123123,
            "name": "Стивен Спилберг"
          }
        ],
        "duration_minutes": 55,
        "genres": [
          "фэнтези",
          "приключения"
        ],
        "id": 23,
        "name": "Game of Thrones",
        "poster_ver": "{{key}}",
        "prod_countries": [
          "США",
          "Великобритания"
        ],
        "prod_date": "2014.01.13",
        "rating": 9.2
      }

] */
