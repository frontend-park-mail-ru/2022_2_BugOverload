import { router } from '@router/Router.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import '@/index.scss';

router.start();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/' })
        .then((registration) => {
            console.log('SW registration OK. Scope:', registration.scope);
        })
        .catch((err) => {
            console.log('SW registration FAIL:', err);
        });

    window.addEventListener('offline', () => {
        ShowErrorMessage('Проблемы с интернет соединением');
    });
}
