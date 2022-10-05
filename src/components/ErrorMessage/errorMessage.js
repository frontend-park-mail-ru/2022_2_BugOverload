/**
* Добавляет в root в index.html сообщение об ошибке
*
*/
export function ShowErrorMessage() {
    const root = document.getElementById('root');
    const err = Handlebars.templates['components/ErrorMessage/errorMessage']({
        errText: 'Упс, что-то пошло не так.',
    });
    root.insertAdjacentElement('beforeend', err);
}
