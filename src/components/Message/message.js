import { ROOT } from '@config/config.js';
import templateError from '@components/Message/errorMessage.handlebars';
import templateSuccess from '@components/Message/successMessage.handlebars';

/**
* Добавляет в root в index.html сообщение, которое изчезает через 2 секунды
*
*/
export function ShowMessage(textMessage = 'Упс, что-то пошло не так.', type = 'negative') {
    let content;
    switch (type) {
    case 'negative':
        content = templateError({ text: textMessage });
        console.log('negative!');
        break;
    case 'positive':
        content = templateSuccess({ text: textMessage });
        console.log('positive!');
        break;
    default:
        content = templateError({ text: textMessage });
        console.log('default!');
    }

    const div = document.createElement('div');

    div.insertAdjacentHTML('beforeend', content);

    ROOT.insertAdjacentElement('beforeend', div);

    setTimeout(() => div.remove(), 2000);
}
