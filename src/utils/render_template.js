export const renderTemplate = (templateName, target, place, props = {}) => {
    const template = Handlebars.templates[templateName];
    const templateHtml = template(props);
    target.insertAdjacentHTML(place, templateHtml);
}
