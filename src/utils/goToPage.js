const renderFunc = ({ Render }) => {
    const Target = new Render();
    Target.render();
};

export const goToPage = (menuElement, callback = renderFunc) => {
    if (callback !== renderFunc) {
        callback();
    } else {
        renderFunc(menuElement);
    }
};
