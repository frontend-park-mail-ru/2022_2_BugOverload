
// addElementFromTemplate(root, 'navbar', {})
// addElementFromTemplate(header, 'bigContent', {})

// let main = document.createElement('')
let root = document.getElementById('root')

let navbar = Handlebars.templates['navbar']({})
let contentBig = Handlebars.templates['bigContent']({})

let div = document.createElement('div')

// div.dataset.backgroundBigContent = 'img/dune_back.jpg'

div.innerHTML = navbar
root.append(div)

div = document.createElement('div')
div.innerHTML = contentBig
// root.append(div) +++


// function addElementFromTemplate(elementDOM, templateName, context) {
//     // let renderTemplate = Handlebars.templates[templateName]
//     // let html = renderTemplate(context)
//     let html = Handlebars.templates[templateName](context)
//     let div = document.createElement('div')
//     // const sanitizer = new Sanitizer();
//     // div.setHTML(html, {sanitizer})
//     div.innerHTML = html

//     // const elem = document.getElementById(element);
//     elementDOM.append(div);
// }