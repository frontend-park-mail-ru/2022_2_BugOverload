export class Ajax {
    static get = async (url) => {
        let response = await fetch(url, {
            mode: 'cors',
            credentials: 'include',
        });

        const result = await response.json();
        return {status: response.status, body: result};
    }

    static post = async ({url, body}) => {
        let response = await fetch(
            url, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify(body),
        });

        const result = await response.json();

        return {status: response.status, body: result};
    }
}
