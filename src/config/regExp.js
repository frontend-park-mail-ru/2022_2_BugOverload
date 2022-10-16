/**
* Содержит все regExp
*/
export const regExp = {
    nick: /^[a-zA-Za-яёА-ЯЁ0-9!"№;%:?*@#$%^&]{4,}$/,
    email: /^.+@.+\..+$/,
    password: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g,

};

export const idRedExp = {
    idFilms: /\d+$/,
};
