import template from '@router/Page404/page404.handlebars';

export const render404 = () => {
    const root = document.getElementById('root');
    root.replaceChildren();
    root.insertAdjacentHTML('afterbegin', template());
};
