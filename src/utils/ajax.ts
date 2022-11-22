/**
* Класс для получения данных с бэкенда по установленному API с методами GET и POST
*
*/
export class Ajax {
    static #csrfToken :string;

    /**
    * Выполняет запрос с методом GET на бэкенд
    *
    * @param {url string} url - url запроса на бэкенд
    * @return {Object} статус ответа и тело ответа в виде JSON
    */
    static async get(url :string) {
        const response = await fetch(url, {
            mode: 'cors',
            credentials: 'include',
            headers: this.#csrfToken ? {
                'X-CSRF-TOKEN': this.#csrfToken,
            } : {
            },
        });
        const csrf = getCookie('CSRF-TOKEN');

        if (csrf) {
            this.#csrfToken = csrf;
        }
        let result = await response.text();

        result = result ? result = JSON.parse(result) : {};

        return { status: response.status, body: result } as anyObject;
    }

    /**
    * Выполняет запрос с методом POST на бэкенд
    *
    * @param {url string} url - url запроса на бэкенд
    * @param {Object} body - объект для отправки
    * @return {Object} статус ответа и тело ответа в виде JSON
    */
    static async post({ url, body } :{ url:string, body:anyObject }) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: this.#csrfToken ? {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.#csrfToken,
            } : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const csrf = getCookie('CSRF-TOKEN');

        if (csrf) {
            this.#csrfToken = csrf;
        }

        let result = await response.text() as any;

        if (result && response.ok) {
            result = JSON.parse(result);
        } else {
            result = {};
        }

        return { status: response.status, body: result } as anyObject;
    }

    /**
    * Выполняет запрос с методом PUT на бэкенд
    *
    * @param {url string} url - url запроса на бэкенд
    * @param {Object} body - объект для отправки
    * @param {Bool} uploadFile - флаг отправки файла
    * @return {Object} статус ответа и тело ответа в виде JSON
    */
    static async put({ url, body } :{ url:string, body:any }, uploadFile = false) {
        let response;
        if (uploadFile) {
            response = await fetch(url, {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                headers: this.#csrfToken ? {
                    'X-CSRF-TOKEN': this.#csrfToken,
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
                    'X-CSRF-TOKEN': this.#csrfToken,
                } : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        }

        let result = await response.text() as any;

        if (result && response.ok) {
            result = JSON.parse(result);
        } else {
            result = {};
        }

        return { status: response.status, body: result } as anyObject;
    }

    /**
    * Выполняет запрос с методом DELETE на бэкенд
    *
    * @param {url string} url - url запроса на бэкенд
    * @param {Object} body - объект для отправки
    * @return {Object} статус ответа и тело ответа в виде JSON
    */
    static async delete({ url , body = {} } :{ url:string, [key: string]: any }) {
        const response = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: this.#csrfToken ? {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.#csrfToken,
            } : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        let result = await response.text() as any;

        if (result && response.ok) {
            result = JSON.parse(result);
        } else {
            result = {};
        }

        return { status: response.status, body: result } as anyObject;
    }
}

const getCookie = (name :string) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};
