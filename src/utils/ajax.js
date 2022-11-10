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
        console.log(this.#csrfToken)
        const response = await fetch(url, {
            mode: 'cors',
            credentials: 'include',
            headers: this.#csrfToken ? {
                'x-csrf-token': 'test',
            }: {
                'x-csrf-token': 'test',
            },
        });
        const csrf = response.headers.get('x-csrf-token');
        console.log('getCsrf', csrf, response.headers.get('x-csrf-token'),response.headers.forEach(console.log))
        if (csrf) {
            this.#csrfToken = csrf;
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
                'x-csrf-token': this.#csrfToken,
            } : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const csrf = response.headers.get('x-csrf-token');
        if (csrf) {
            this.#csrfToken = csrf;
        }

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
                headers: this.#csrfToken ? {
                    'x-csrf-token': this.#csrfToken,
                } : {
                },
                body,
            });
        } else {
            response = await fetch(url, {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                headers: this.#csrfToken ? {
                    'Content-Type': 'application/json',
                    'x-csrf-token': this.#csrfToken,
                } : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        }

        const csrf = response.headers.get('x-csrf-token');
        if (csrf) {
            this.#csrfToken = csrf;
        }

        let result = await response.text();

        if (result && result !== 'Forbidden') {
            result = JSON.parse(result);
        } else {
            result = {};
        }

        return { status: response.status, body: result };
    }

    /**
    * Выполняет запрос с методом DELETE на бэкенд
    *
    * @param {url string} url - url запроса на бэкенд
    * @param {Object} body - объект для отправки
    * @return {Object} статус ответа и тело ответа в виде JSON
    */
    static async delete({ url, body = {} }) {
        const response = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: this.#csrfToken ? {
                'Content-Type': 'application/json',
                'x-csrf-token': this.#csrfToken,
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
}
