export const checkInput = (form ,action ,input ,type = 'text') => {
    if (type == 'email') {
        if(!input) {
            renderError(form, type, 'Введите email'); 
            return false;
        }
        if(!input.match(/@/)) {
            if (action === 'signup') {
                renderError(form, type, 'Такого адреса не существует');
            } 
            if (action === 'login') {
                renderError(form, type, 'Неправильный адрес');
            }
            return false;
        }
        removeError(form,type);
        return true;
    }
    if (type == 'password') {
        if(!input) {
            renderError(form, type, 'Введите пароль'); 
            return false;
        }
        if(!input.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g)) {
            if (action === 'signup') {
                (input.length > 5) ?
                    renderError(form, type, 'В пароле должна быть хотя бы одна цифра, маленькая и большая буква')
                    :renderError(form, type, 'В пароле должно быть не меньше 6 символов');
            } 
            if (action === 'login') {
                renderError(form, type, 'Неправильный пароль');
            }
            return false;
        }
        removeError(form,type);
        return true;
    }
    if(!input) {
        renderError(form, type, 'Вы кое-что забыли! Скажите, как вас зовут.'); 
        return false;
    }
    if (!input.match(/^[a-zA-Za-яёА-ЯЁ0-9!"№;%:?*@#$%^&]{4,}$/)) {
        (input.length > 3) ?
                    renderError(form, type, 'Недопустимый символ')
                    :renderError(form, type, 'В имени должно быть не меньше 4 символов');
            
        return false;
    }
    removeError(form,type);
    return true;
}

const removeError = (form,type) => {
    const errorElement = form
        .querySelector(`input[type=${type}]`)
        .parentElement
        .querySelector('.modal__input__error')

    if (errorElement) {
        errorElement.remove();
    }

    form
        .querySelector(`input[type=${type}]`)
        .classList.remove('modal__input_red_border');
}

export const renderError = (form, type, text) => {
    const target = form.querySelector(`input[type=${type}]`);
    target.classList.add('modal__input_red_border');
    if(target.parentElement.querySelector('.modal__input__error')) {
        const erorElement = target.parentElement.querySelector('.modal__input__error');
        if(text === erorElement.textContent) {
            return;
        }
        erorElement.remove();
    }
    const insertHtml = `<div class="modal__input__error">${text}</div>`
    target.insertAdjacentHTML('afterend', insertHtml);
}