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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js', { scope: '/' })
      .then((registration) => {
        console.log('sw available on scope:', registration.scope);
      })
      .catch((err) => {
        console.error(err);
      });
}
