import { router } from '@router/Router';
import '@/index.scss';
import { ShowMessage } from '@components/Message/message';
import { webSocket } from '@/webSocket';

router.start();
webSocket.initialize();

document.addEventListener('click', (e) => {
    const target = e.target as Element;

    if (target.classList.contains('js-showError')) {
        ShowMessage('В разработке', 'negative');
    }
})
