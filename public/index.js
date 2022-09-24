let template = Handlebars.templates['navbar']
let navbar = template({})
console.log(navbar)

document.body.innerHTML = navbar;
const root = document.getElementById('root');
template = Handlebars.templates['test']
document.body.innerHTML = template({});
