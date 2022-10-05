import { regExp } from '../../config/regExp.js';

export const checkNick = (form, input) => {
    if (!input) {
        renderError(form, 'text', 'Вы кое-что забыли! Скажите, как вас зовут');
        return false;
    }
    if (!input.match(regExp.nick)) {
        if (input.length > 3) {
            renderError(form, 'text', 'Недопустимый символ');
        } else {
            renderError(form, 'text', 'В имени должно быть не меньше 4 символов');
        }
        return false;
    }
    removeError(form, 'text');
    return true;
};

export const checkEmail = (form, input) => {
    if (!input) {
        renderError(form, 'email', 'Введите email');
        return false;
    }
    if (!input.match(regExp.email)) {
        renderError(form, 'email', 'Такого адреса не существует');

        return false;
    }
    removeError(form, 'email');
    return true;
};

const checkConfirmPassword = (confirm, confirmPassword, password, textErrorPassword = null) => {
    if (!confirmPassword) {
        renderError(confirm, 'password', 'Введите пароль');
        return false;
    }

    if (confirmPassword !== password) {
        renderError(confirm, 'password', 'Пароли не совпадают');
        return false;
    }

    if ((confirmPassword === password) && textErrorPassword) {
        if (textErrorPassword) {
            renderError(confirm, 'password', textErrorPassword);
            return false;
        }
    }

    return true;
};

export const checkPassword = (form, input,type = null, confirmPassword = null) => {
    const confirm = document.getElementById('confirm');
    if (!input) {
        renderError(form, 'password', 'Введите пароль');
        if (type) {
            if (!checkConfirmPassword(confirm, confirmPassword, input)) {
                return false;
            }
            removeError(confirm, 'password');
        }
        return false;
    }
    if (!input.match(regExp.password)) {
        let textError;
        if (input.length > 5) {
            textError = 'В пароле должна быть хотя бы одна цифра, маленькая и большая буква';
            renderError(form, 'password', textError);
            if (type) {
                if (!checkConfirmPassword(confirm, confirmPassword, input, textError)) {
                    return false;
                }
                removeError(confirm, 'password');
            }
        }
        if (input.length < 6) {
            textError = 'В пароле должно быть не меньше 6 символов';
            renderError(form, 'password', textError);
            if (type) {
                if (!checkConfirmPassword(confirm, confirmPassword, input, textError)) {
                    return false;
                }
                removeError(confirm, 'password');
            }
        }
    }
    if (type) {
        if (!checkConfirmPassword(confirm, confirmPassword, input)) {
            return false;
        }
        removeError(confirm, 'password');
    }
    removeError(form, 'password');
    return true;
};

const removeError = (form, type) => {
    const errorElement = form
        .querySelector(`input[type=${type}]`)
        .parentElement
        .querySelector('.modal__input__error');

    if (errorElement) {
        errorElement.remove();
    }

    form
        .querySelector(`input[type=${type}]`)
        .classList.remove('modal__input_red_border');
};

export const renderError = (form, type, text) => {
    const target = form.querySelector(`input[type=${type}]`);
    target.classList.add('modal__input_red_border');
    if (target.parentElement.querySelector('.modal__input__error')) {
        const erorElement = target.parentElement.querySelector('.modal__input__error');
        if (text === erorElement.textContent) {
            return;
        }
        erorElement.remove();
    }
    const insertHtml = `<div class="modal__input__error">${text}</div>`;
    target.insertAdjacentHTML('afterend', insertHtml);
};
