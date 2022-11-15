import { Ajax } from '@utils/ajax.js';
import { getDateNow } from '@utils/common.js';
import { API, responsStatuses } from '@config/config.js';
import { decoreDate } from '@utils/decorationData.js';

class ReducerUser {
    async login(user) {
        const responsePromise = Ajax.post({
            url: API.login,
            body: user,
        });

        const response = await responsePromise;
        if (response.status === responsStatuses.OK) {
            return {
                user: handlerUrlObject(response.body, 'avatar'),
                statusLogin: null,
            };
        }
        return { statusLogin: response.status };
    }

    async signup(user) {
        const responsePromise = Ajax.post({
            url: API.signup,
            body: user,
        });

        const response = await responsePromise;
        if (response.status === responsStatuses.Created) {
            return {
                user: handlerUrlObject(response.body, 'avatar'),
                statusSignup: null,
            };
        }
        return { statusSignup: response.status };
    }

    async auth() {
        let responsePromise;
        try {
            responsePromise = Ajax.get(API.auth);
        } catch(e) {
            return {
                user: null,
                authStatus: null,
            };
        }

        const response = await responsePromise;
        if (response.status === responsStatuses.OK) {
            return {
                user: handlerUrlObject(response.body, 'avatar'),
                authStatus: null,
            };
        }
        return { authStatus: response.status };
    }

    async logout() {
        const responsePromise = Ajax.get(API.logout);

        const response = await responsePromise;
        if (response.status === responsStatuses.NoContent) {
            return {
                user: null,
                logoutStatus: responsStatuses.NoContent,
            };
        }
        return null;
    }

    async getSettings() {
        const responsePromise = Ajax.get(API.settings());

        const response = await responsePromise;
        if (response.status === responsStatuses.OK) {
            return {
                userInfo: handlerUserInfoFields(response.body),
            };
        }
        return null;
    }

    async putSettings(user) {
        const responsePromise = Ajax.put({
            url: API.settings,
            body: user,
        });

        const response = await responsePromise;
        if (response.status !== responsStatuses.NoContent) {
            return {
                statusChangeSettings: response.status,
            };
        }
        return { statusChangeSettings: null };
    }

    async putAvatar(formDataAvatar) {
        const responsePromise = Ajax.put({
            url: API.put_avatar,
            body: formDataAvatar,
        }, true);

        const response = await responsePromise;
        if (response.status === responsStatuses.NoContent) {
            return {
                statusChangeAvatar: response.status,
            };
        }
        return { statusChangeAvatar: null };
    }

    async getPublicProfile(id) {
        const responsePromise = Ajax.get(API.publicProfile(id));

        const response = await responsePromise;
        if (response.status === responsStatuses.OK) {
            return {
                [`user${id}`]: handlerUserInfoFields((response.body)),
            };
        }
        return null;
    }
}

export const reducerUser = new ReducerUser();

const handlerUrlObject = (object, nameObject) => {
    if (nameObject === 'avatar') {
        const newUrl = API.img.user_avatar(object[nameObject]);
        if (object[nameObject] !== newUrl) {
            object[nameObject] = newUrl;
        }
    }
    return object;
};

const handlerUserInfoFields = (userInfo) => {
    if (userInfo) {
        userInfo.joined_date = decoreDate(userInfo?.joined_date || getDateNow());
        userInfo.count_ratings = userInfo.count_ratings || 'вы не поставили ни одной оценки';
        userInfo.count_collections = userInfo.count_collections || 'у вас пока нет коллекций';
        userInfo.count_reviews = userInfo.count_reviews || 'у вас пока нет рецензий';
        if (userInfo.avatar) {
            userInfo.avatar = API.img.user_avatar(userInfo.avatar);
        }
    }

    return userInfo;
};
