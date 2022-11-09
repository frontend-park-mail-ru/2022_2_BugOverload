/**
* Класс для получения данных с бэкенда по установленному API с методами GET и POST
*
*/
export class Ajax {
    static #csrfToken;

    /**
    * Выполняет запрос с методом GET на бэкенд
    *
    * @param {url string} url - url запроса на бэкенд
    * @return {Object} статус ответа и тело ответа в виде JSON
    */
    static async get(url) {
        const response = await fetch(url, {
            mode: 'cors',
            credentials: 'include',
        });
        const csrf = response.headers.get('X-Csrf-Token');
        if (csrf) {
            Ajax.#csrfToken = csrf;
        }
        let result = await response.text();

        result = result ? result = JSON.parse(result) : {};

        return { status: response.status, body: result };
    }

    /**
    * Выполняет запрос с методом POST на бэкенд
    *
    * @param {url string} url - url запроса на бэкенд
    * @param {Object} body - объект для отправки
    * @return {Object} статус ответа и тело ответа в виде JSON
    */
    static async post({ url, body }) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: this.#csrfToken ? {
                'Content-Type': 'application/json',
                'X-Csrf-Token': this.#csrfToken,
            } : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        let result = await response.text();

        if (result && result !== 'Forbidden') {
            result = JSON.parse(result);
        } else {
            result = {};
        }

        return { status: response.status, body: result };
    }

    /**
    * Выполняет запрос с методом PUT на бэкенд
    *
    * @param {url string} url - url запроса на бэкенд
    * @param {Object} body - объект для отправки
    * @param {Bool} uploadFile - флаг отправки файла
    * @return {Object} статус ответа и тело ответа в виде JSON
    */
    static async put({ url, body }, uploadFile = false) {
        let response;
        if (uploadFile) {
            response = await fetch(url, {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                body,
            });
        } else {
            response = await fetch(url, {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        }

        let result = await response.text();

        if (result && result !== 'Forbidden') {
            result = JSON.parse(result);
        } else {
            result = {};
        }

        return { status: response.status, body: result };
    }
}
