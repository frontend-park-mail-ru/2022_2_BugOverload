import { Ajax } from '@utils/ajax';
import { getDateNow } from '@utils/common';
import { API, responsStatuses } from '@config/config';
import { decoreDate } from '@utils/decorationData';
import { mockUserCollections } from '@store/reducers/mockData';

interface userResponse{
    status: number;
    body: user;
}

interface userInfoResponse{
    status: number;
    body: userInfo;
}

interface userColResponse{
    status: number;
    body: Array<userCollection>;
}

class ReducerUser {
    async login(user :anyObject) {
        const responsePromise = Ajax.post({
            url: API.login,
            body: user,
        });

        const response = await responsePromise as userResponse;
        if (response.status === responsStatuses.OK) {
            return {
                user: handlerUrlObject(response.body, 'avatar'),
                statusLogin: null,
            } as anyObject;
        }
        return { statusLogin: response.status };
    }

    async signup(user :anyObject) {
        const responsePromise = Ajax.post({
            url: API.signup,
            body: user,
        });

        const response = await responsePromise as userResponse;
        if (response.status === responsStatuses.Created) {
            return {
                user: handlerUrlObject(response.body, 'avatar'),
                statusSignup: null,
            } as anyObject;
        }
        return { statusSignup: response.status };
    }

    async auth() {
        let responsePromise;
        try {
            responsePromise = Ajax.get(API.auth);
        } catch (e) {
            return {
                user: null,
                authStatus: null,
            };
        }

        const response = await responsePromise as userResponse;
        if (response.status === responsStatuses.OK) {
            return {
                user: handlerUrlObject(response.body, 'avatar'),
                authStatus: null,
            } as anyObject;
        }
        return { authStatus: response.status };
    }

    async logout() {
        const responsePromise = Ajax.delete({ url: API.logout });

        const response = await responsePromise as Response;
        if (response.status === responsStatuses.NoContent) {
            return {
                logoutStatus: responsStatuses.NoContent,
                user: {},
            } as anyObject;
        }
        return null;
    }

    async getSettings() {
        const responsePromise = Ajax.get(API.settings());

        const response = await responsePromise as userInfoResponse;
        if (response.status === responsStatuses.OK) {
            return {
                userInfo: handlerUserInfoFields(response.body),
            };
        }
        return null;
    }

    async putSettings(user :anyObject) {
        const responsePromise = Ajax.put({
            url: API.settings(),
            body: user,
        });

        const response = await responsePromise as Response;
        if (response.status !== responsStatuses.NoContent) {
            return {
                statusChangeSettings: response.status,
            };
        }
        return { statusChangeSettings: null };
    }

    async putAvatar(formDataAvatar :FormData) {
        const responsePromise = Ajax.put({
            url: API.put_avatar,
            body: formDataAvatar,
        }, true);

        const response = await responsePromise as Response;
        if (response.status === responsStatuses.NoContent) {
            return {
                statusChangeAvatar: response.status,
            };
        }
        return { statusChangeAvatar: null };
    }

    async getPublicProfile(id :number) {
        const responsePromise = Ajax.get(API.publicProfile(id));

        const response = await responsePromise as Response;
        if (response.status === responsStatuses.OK) {
            return {
                [`user${id}`]: handlerUserInfoFields((response.body)),
            };
        }
        return null;
    }

    async getUserCollections({sort_param, count_collections, delimiter}: userCollsParams) {
        let response;
        try {
            response = await Ajax.get(API.userCollections(sort_param, count_collections, delimiter)) as userColResponse;
        } catch (e) {
            return { userCollections: mockUserCollections() };
        }

        if (response.status === responsStatuses.OK) {
            return { userCollections: handlerListUserCol(response.body) };
        }

        if (response.status === responsStatuses.NotFound) {
            return { userCollections: {status: response.status} };
        }

        return { userCollections: {error: 'error'} };
    }
}

export const reducerUser = new ReducerUser();

const handlerUrlObject = (object :user, nameObject :string) => {
    if (nameObject === 'avatar') {
        const newUrl = API.img.user_avatar(object[nameObject]);
        if (object[nameObject] !== newUrl) {
            object[nameObject] = newUrl;
        }
    }
    return object;
};

const handlerUserInfoFields = (userInfo :anyObject) => {
    if (userInfo) {
        userInfo.joined_date = decoreDate(userInfo?.joined_date || getDateNow());
        userInfo.count_ratings = userInfo.count_ratings || 'нет оценок';
        userInfo.count_collections = userInfo.count_collections || 'нет коллекций';
        userInfo.count_reviews = userInfo.count_reviews || 'нет рецензий';
        if (userInfo.avatar) {
            userInfo.avatar = API.img.user_avatar(userInfo.avatar);
        }
    }

    return userInfo;
};

const handlerListUserCol = (arrayUserCol :Array<userCollection>) => {
    arrayUserCol.forEach((userCol) => {
        if(userCol.name === 'Избранное' || userCol.name === 'Буду смотреть') {
            userCol.private_col = true;
            console.log(userCol)
        }
    });
    return arrayUserCol;
};
