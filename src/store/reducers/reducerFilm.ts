import { Ajax } from '@utils/ajax';
import { getDateNow } from '@utils/common';
import { API, responsStatuses } from '@config/config';
import { store } from '@store/Store';
import { mockFilm, mockPremieres, mockCollection } from '@store/reducers/mockData';

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

    async rate(ratingData: rateParams) {
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

    async getMetaDataFilm({ filmID }: metaDateParams) {
        const response = await Ajax.get(API.metaFilm(filmID)) as anyObject;
        if (response.status === responsStatuses.OK) {
            return {
                listCollectionsUser: response.body?.collections,
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

    async getDataReviews({filmID, count, offset}: reviewParams) {
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

    async sendReview(reviewData: review) {
        const { filmID } = reviewData;
        delete reviewData['filmID'];
        const response = await Ajax.post({
            url: API.send_review(filmID),
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

    async getPremieresData({countFilms = 0, delimiter = 0}: premiereParams) {
        let response;
        try {
            response = await Ajax.get(API.premieres(countFilms, delimiter)) as Response;
        } catch (e) {
            return { premieres: mockPremieres() };
        }
        if (response.status === responsStatuses.OK) {
            return { premieres: response.body };
        }

        return { premieres: null };
    }

    async saveToCollection(saveToCollParams: filmToCollParams) {
        const response = await Ajax.post({
            url: API.saveToColl(saveToCollParams.idFilm),
            body: { collection_id: saveToCollParams.idCollection },
        });

        if (response.status === responsStatuses.NoContent) {
            const newList = store.getState('listCollectionsUser');
            if(newList) {
                for (let coll of newList) {
                    if (coll.id === saveToCollParams.idCollection) {
                        coll.is_used = true;
                        break;
                    }
                }
            }

            return {
                saveToCollStatus: response.status,
                listCollectionsUser: newList,
            };
        }

        return { saveToCollStatus: response.status };
    }

    //удаляет фильм из коллекции
    async removeFromCollection(removeFromCollParams: filmToCollParams) {
        const response = await Ajax.delete({
            url: API.removeFromColl(removeFromCollParams.idFilm),
            body: { collection_id: Number(removeFromCollParams.idCollection) },
        });

        const newList = store.getState('listCollectionsUser');
        if(newList) {
            for (let coll of newList) {
                if (coll.id === removeFromCollParams.idCollection) {
                    delete coll.is_used;
                    break;
                }
            }
        }

        if (response.status === responsStatuses.NoContent) {
            return {
                removeFromCollStatus: response.status,
                listCollectionsUser: newList,
            };
        }

        return { removeFromCollStatus: response.status };
    };

    async getSimilarFilms(idFilm: number) {
        let response;
        try {
            response = await Ajax.get(API.getSimilarFilms(idFilm)) as Response;
        } catch (e) {
            return { [`film${idFilm}Similar`]: mockCollection() };
        }
        if (response.status === responsStatuses.OK) {
            return { [`film${idFilm}Similar`]: response.body };
        }
      return null;
    }
}

export const reducerFilm = new ReducerFilm();

const handlerAvatarReviews = (object :anyObject) => {
    object.forEach((element :any) => {
        element.author.avatar = API.img.user_avatar(element.author.avatar);
    });
    return object;
};
