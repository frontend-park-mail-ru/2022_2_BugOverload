const renderTemplate = (templateName, target, place, props = {}) => {
    console.log(props);
    console.log(target);
    const template = Handlebars.templates[templateName];
    const templateHtml = template(props);
    target.insertAdjacentHTML(place, templateHtml);
};

export { renderTemplate };
