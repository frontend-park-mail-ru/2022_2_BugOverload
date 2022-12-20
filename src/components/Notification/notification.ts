import { ROOT } from '@config/config';
import template from '@components/Notification/notification.handlebars';
import {
    getMonthName,
} from '@utils/decorationData';

import { roundFloat } from '@utils/common';

export const showNotification = (type:string = 'ANONS_FILM', payload: filmNotifPayload) => {
    let content:string;
    switch (type) {
    case 'ANONS_FILM':
        const sepDate = payload.prod_date.split(' ')[0].split('.').reverse();
        content = template({
            ...payload,
            rating: roundFloat(payload.rating),
            description: `В Кино с ${+sepDate[0]} ${getMonthName(+sepDate[1])}!`
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
