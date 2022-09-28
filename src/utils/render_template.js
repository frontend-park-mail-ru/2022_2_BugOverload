export const renderTemplate = (templateName, callback, parametrs = {}) => {
    const template = Handlebars.templates[templateName];
    const templateHtml = template(parametrs);
    const safeheaderHtml = DOMPurify.sanitize(templateHtml);
    callback(safeheaderHtml);
}