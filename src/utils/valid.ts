import { regExp } from '@config/regExp';

/**
 * Проверяет ник
 * @param {Element} form - форма из которой взяты данные
 * @param {String} input - пользовательский ввод
 * @return {Bool} Прошла ли проверка успешно
*/
export const checkNick = (form :HTMLElement, input :string) => {
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

/**
 * Проверяет email
 * @param {Element} form - форма из которой взяты данные
 * @param {String} input - пользовательский ввод
 * @return {Bool} Прошла ли проверка успешно
*/
export const checkEmail = (form :HTMLElement, input :string) => {
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

/**
 * Проверяет подтверждение пароля
 * @param {Element} confirm - обёртка вокруг input
 * @param {String} confirmPassword - подтверждение пароля
 * @param {String} confirmPassword - пароль
 * @return {Bool} Прошла ли проверка успешно
*/
export const checkConfirmPassword = (confirm :HTMLElement, confirmPassword :string, password :string) => {
    if (!confirmPassword) {
        renderError(confirm, 'password', 'Введите пароль');
        return false;
    }

    if ((confirmPassword !== password)) {
        if (password && checkPassword(confirm, password)) {
            renderError(confirm, 'password', 'Пароли не совпадают');
        }
        renderError(confirm, 'password', 'Пароли не совпадают');
        return false;
    }

    const errorPassword = confirm
        .previousElementSibling
        .querySelector('.js-modal__input__error');

    if ((confirmPassword === password) && errorPassword) {
        renderError(confirm, 'password', errorPassword.textContent);
        return false;
    }
    removeError(confirm, 'password');
    return true;
};

/**
 * Проверяет пароль
 * @param {Element} form - форма из которой взяты данные
 * @param {String} input - пользовательский ввод
 * @param {Bool} [validateConfirm = false] - проверять ли подтверждение пароля
 * @param {String} [confirmPassword = null] - подтверждение пароля
 * @return {Bool} Прошла ли проверка успешно
*/
export const checkPassword = (form :HTMLElement, input :string, validateConfirm = false, confirmPassword = null as string) => {
    const confirm = document.getElementById('confirm');

    if (!input) {
        renderError(form, 'password', 'Введите пароль');
        if (validateConfirm) {
            removeError(confirm, 'password');
        }
        return false;
    }
    if (!input.match(regExp.password)) {
        let textError;
        if (input.length > 5) {
            textError = 'В пароле должна быть хотя бы одна цифра, маленькая и большая буква';
            renderError(form, 'password', textError);
            if (validateConfirm) {
                if (!checkConfirmPassword(confirm, confirmPassword, input)) {
                    return false;
                }
                removeError(confirm, 'password');
            }
            return false;
        }
        if (input.length < 6) {
            textError = 'В пароле должно быть не меньше 6 символов';
            renderError(form, 'password', textError);
            if (validateConfirm) {
                if (!checkConfirmPassword(confirm, confirmPassword, input)) {
                    return false;
                }
                removeError(confirm, 'password');
            }
            return false;
        }
    }
    if (validateConfirm) {
        if (!checkConfirmPassword(confirm, confirmPassword, input)) {
            return false;
        }
        removeError(confirm, 'password');
    }
    removeError(form, 'password');
    return true;
};

/**
 * Убирает сообщение об ошибке
 * @param {Element} form - форма из которой взяты данные
 * @param {String} type - тип input
*/
export const removeError = (form :HTMLElement, type :string, input = true) => {
    let errorInput;
    if (!input) {
        errorInput = form.querySelector(`.${type}`);
    } else {
        errorInput = form.querySelector(`input[type=${type}]`);
    }

    if (!errorInput) {
        return;
    }

    const errorElement = errorInput
        .parentElement
        .querySelector('.js-modal__input__error');

    if (errorElement) {
        errorElement.remove();
    }

    errorInput.classList.remove('modal__input_red_border');
};

/**
 * Выводит сообщение об ошибке
 * @param {Element} form - форма из которой взяты данные
 * @param {String} type - тип input
 * @param {String} text - текст ошибки
*/
export const renderError = (form :HTMLElement, type :string, text :string, input = true) => {
    let target;
    if (!input) {
        target = form.querySelector(`.${type}`);
    } else {
        target = form.querySelector(`input[type=${type}]`);
    }

    target.classList.add('modal__input_red_border');
    if (target.parentElement.querySelector('.js-modal__input__error')) {
        const erorElement = target.parentElement.querySelector('.js-modal__input__error');
        if (text === erorElement.textContent) {
            return;
        }

        erorElement.remove();
    }
    const insertHtml = `<div class="modal__input__error js-modal__input__error">${text}</div>`;
    target.insertAdjacentHTML('afterend', insertHtml);
};
