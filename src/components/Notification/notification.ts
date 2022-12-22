import { ROOT } from '@config/config';
import { getMonthName } from '@utils/decorationData';
import { API } from '@config/config';
import { roundFloat } from '@utils/common';

import { NotificationUI } from 'moviegate-ui-kit';

export const showNotification = (type:string = 'ANONS_FILM', payload: filmNotifPayload) => {
    let content:string;
    switch (type) {
    case 'ANONS_FILM':
        const sepDate = payload.prod_date.split(' ')[0].split('.').reverse();
        content = NotificationUI.renderTemplate({
            ...payload,
            rating: roundFloat(payload.rating),
            poster_ver: API.img.poster_ver(payload.poster_ver),
            description: `В Кино с ${+sepDate[0]} ${getMonthName(+sepDate[1])}!`,
            ticket: payload.ticket || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        });
        break;
    default:
        content = '';
    }

    let placeholder = ROOT.querySelector('.js-placeholder-notification');
    if (!placeholder) {
        const div = document.createElement('div');
        div.classList.add('js-placeholder-notification', 'placeholder-notification');

        ROOT.insertAdjacentElement('beforeend', div);
        placeholder = ROOT.querySelector('.js-placeholder-notification');
    }

    placeholder.insertAdjacentHTML('afterbegin', content);

    const cancelHandler = function callback(e: Event) {
        e.preventDefault();
        e.target.removeEventListener('click', callback);
        (e.target as HTMLElement).closest('.js-notification').remove();
    };

    placeholder.querySelector('.js-notification__cancel-icon')?.addEventListener('click', cancelHandler);
}
