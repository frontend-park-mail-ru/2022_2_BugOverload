export const checkNick = (form, input) => {
    if (!input) {
        renderError(form, 'text', 'Вы кое-что забыли! Скажите, как вас зовут');
        return false;
    }
    if (!input.match(/^[a-zA-Za-яёА-ЯЁ0-9!"№;%:?*@#$%^&]{4,}$/)) {
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
    if (!input.match(/^.+@.+\..+$/)) {
        renderError(form, 'email', 'Такого адреса не существует');

        return false;
    }
    removeError(form, 'email');
    return true;
};

const checkConfirmPassword = (wrappers, confirmPassword, password, textErrorPassword = null) => {
    if (!confirmPassword) {
        renderError(wrappers[3], 'password', 'Введите пароль');
        return false;
    }

    if (confirmPassword !== password) {
        renderError(wrappers[3], 'password', 'Пароли не совпадают');
        return false;
    }

    if (confirmPassword === password) {
        if (textErrorPassword) {
            renderError(wrappers[3], 'password', textErrorPassword);
            return false;
        }
    }

    return true;
};

export const checkPassword = (form, input, confirmPassword = null) => {
    const wrappers = form.querySelectorAll('.modal__wrapper__input');
    if (!input) {
        renderError(form, 'password', 'Введите пароль');
        if (!(confirmPassword === null)) {
            if (!checkConfirmPassword(wrappers, confirmPassword, input)) {
                return false;
            }
            removeError(wrappers[3], 'password');
        }
        return false;
    }
    if (!input.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g)) {
        let textError;
        if (input.length > 5) {
            textError = 'В пароле должна быть хотя бы одна цифра, маленькая и большая буква';
            renderError(form, 'password', textError);
            if (confirmPassword) {
                if (!checkConfirmPassword(wrappers, confirmPassword, input, textError)) {
                    return false;
                }
                removeError(wrappers[3], 'password');
            }
        }
        if (input.length < 6) {
            textError = 'В пароле должно быть не меньше 6 символов';
            renderError(form, 'password', textError);
            if (confirmPassword) {
                if (!checkConfirmPassword(wrappers, confirmPassword, input, textError)) {
                    return false;
                }
                removeError(wrappers[3], 'password');
            }
        }
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
