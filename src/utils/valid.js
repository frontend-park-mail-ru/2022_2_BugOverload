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
            console.log('invalid_email')
            return false;
        }
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
                    renderError(form, type, 'В пароле должна быть хотя бы одна цифра,маленькая и большая буква')
                    :renderError(form, type, 'В пароле должно быть не меньше 6 символов');
            } 
            if (action === 'login') {
                renderError(form, type, 'Неправильный пароль');
            }
            console.log('invalid_password')
            return false;
        }
        return true;
    }
    if(!input) {
        renderError(form, type, 'Введите имя'); 
        return false;
    }
    if (!input.match(/^[a-zA-Za-яёА-ЯЁ0-9!"№;%:?*@#$%^&]{4,}$/)) {
        (input.length > 3) ?
                    renderError(form, type, 'Недопустимый символ')
                    :renderError(form, type, 'В имени должно быть не меньше 4 символов');
            
        return false;
    }
    return true;
}

const renderError = (form, type, text) => {
    const target = form.querySelector(`input[type=${type}]`);
    /*if(target.parentElement.querySelector('.modal__input__error')) {
        return;
    }*/
    //d checkInput вытащить текст ошибки, проверить совпадает или нет 
    const insertHtml = `<div class="modal__input__error">${text}</div>`
    target.insertAdjacentHTML('afterend', insertHtml);
}