import template from '@router/Page404/page404.handlebars';

export const wrapperAsync = (response) => {
    if (response.status === 404) {
        render404();
        return null;
    }
    return response;
};

export const render404 = () => {
    const root = document.getElementById('root');
    root.replaceChildren();
    root.insertAdjacentHTML('afterbegin', template());
};
