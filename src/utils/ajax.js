export class Ajax {
    static async get(url) {
        const response = await fetch(url, {
            mode: 'cors',
            credentials: 'include',
        });

        const result = await response.json();
        return { status: response.status, body: result };
    }

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

        const result = await response.json();

        return { status: response.status, body: result };
    }
}
