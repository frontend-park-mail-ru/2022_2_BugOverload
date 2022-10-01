const renderFunc = (menuElement) => {
    const target = new (menuElement.render)();
    target.render();
};

export const goToPage = (menuElement,callback = renderFunc,current = document.body) => {
    let activeLink = current.querySelector('.active')
    if (activeLink) {
        activeLink.classList.remove('active');
    }
    current.querySelector(`[data-section="${menuElement.href.slice(1)}"]`).classList.add('active');
    (callback != renderFunc) ? callback() : renderFunc(menuElement);
}