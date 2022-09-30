export class Ajax {
    get = async ({url,callback}) => {
        let response = await fetch(url, {
            mode: 'cors',
            credentials: 'include',
        });
        if (callback(response)) {
            let result = await response.json();
            return result;
        }

        return null;
    }

    post = async ({url, body, callback}) => {
        console.log(body)
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
    
        callback(response, result);
    }
}
