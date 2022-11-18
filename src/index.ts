import { router } from '@router/Router';
import '@/index.scss';
import { ShowMessage } from '@components/Message/message.js';

router.start();

document.addEventListener('click', (e) => {
    const target = e.target as Element;

    if (target.classList.contains('js-showError')) {
        ShowMessage('В разработке', 'negative');
    }
})
