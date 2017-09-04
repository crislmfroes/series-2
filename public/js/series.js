const serieSource = document.querySelector('#serieTemplate');
const temporadaSource = document.querySelector('#temporadaTemplate');
const episodioSource = document.querySelector('#episodioTemplate');

const serieTemplate = Handlebars.compile(serieSource.innerHTML);
const temporadaTemplate = Handlebars.compile(temporadaSource.innerHTML);
const episodioTemplate = Handlebars.compile(episodioSource.innerHTML);

let series = []
if (Persistencia.existe)