const renderFunc = ({ Render }) => {
    const Target = new Render();
    Target.render();
};


export const goToPage = (menuElement, callback = renderFunc, current = document.body) => {
    const activeLink = current.querySelector('.active');
    if (activeLink) {
        activeLink.classList.remove('active');
    }
    current.querySelector(`[data-section="${menuElement.href.slice(1)}"]`).classList.add('active');
    if (callback !== renderFunc) {
        callback();
    } else {
        renderFunc(menuElement);
    }
};
