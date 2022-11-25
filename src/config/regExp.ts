/**
* Содержит все regExp
*/
export const regExp = {
    nick: /^[a-zA-Za-яёА-ЯЁ0-9!"№;%:?*@#$%^&]{4,}$/,
    email: /^.+@.+\..+$/,
    password: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g,
};

export const hrefRegExp = {
    host: /^\w+:\/\/\w+\-\w+\.\w+/i,
    localhost: /^\w+:\/\/\w+:\d+/i,
    auth: /\w+\/$/i,
    idFilms: /\w+\-\w+|\w*\d+$/,
    nameCollection: /\w+\d+$/,
    filmProps: '(\\w+\\-*\\w*)',
    endSlash: /\/$/,
};
