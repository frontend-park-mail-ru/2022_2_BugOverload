/**
* Класс для получения данных с бэкенда по установленному API с методами GET и POST
*
*/
export class Ajax {
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

        let result = await response.text();

        result = result ? result = JSON.parse(result) : {};

        return { status: response.status, body: result };
    }

    /**
    * Выполняет запрос с методом POST на бэкенд
    *
    * @param {url string} url - url запроса на бэкенд
    * @return {Object} статус ответа и тело ответа в виде JSON
    */
    static async post({ url, body }) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        let result = await response.text();

        result = result ? result = JSON.parse(result) : {};

        return { status: response.status, body: result };
    }
}
