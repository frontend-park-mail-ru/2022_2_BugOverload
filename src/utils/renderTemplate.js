/**
 * Рендерит шаблон
 * @param {Object} [props = {}] - свойства для подстановки в шаблон
 * @param {String} templateName - имя шаблона
 * @param {Element} target - элемент относительно которого в DOM будет вставлен шаблон
 * @param {String} place - место относительно target
*/
const renderTemplate = (templateName, target, place, props = {}) => {
    // const template = Handlebars.templates[templateName];
    // const templateHtml = template(props);
    // target.insertAdjacentHTML(place, templateHtml);
};

export { renderTemplate };
