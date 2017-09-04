const formSerie = document.querySelector('#formSerie');
const formTemporada = document.querySelector('#formTemporada');
let series = [];
if (Persistencia.existe('series')) {
    series = Persistencia.carrega('series');
    for (let i = 0; i < series.length; i++) {
        adicionaOption(series[i]);
    }
}
function findSerie(nome) {
    for (serie of series) {
        if (serie.nome === nome) {
            return serie;
        }
    }
}

function adicionaOption(serie) {
    const option = document.createElement('option');
    option.value = serie.nome;
    option.innerText = serie.nome;
    formTemporada.selectSeries.appendChild(option);
}

function sucesso(nome) {
    const source = document.querySelector('#templateSucesso');
    const template = Handlebars.compile(source.innerHTML);
    const mensagem = document.querySelector('#mensagem');
    mensagem.innerHTML = template({
        'nome': nome
    });
}
function atualiza(serieSelecionada) {
    for (serie of series) {
        if (serie.nome === serieSelecionada.nome) {
            serie = serieSelecionada;
        }
    }
}
formSerie.addEventListener('submit', function (event) {
    let nome = formSerie.nomeDaSerie.value;
    console.log(nome);
    let adiciona = true;
    for (let i = 0; i < series.length; i++) {
        if (series[i].nome === nome) {
            adiciona = false;
            break;
        }
    }
    if (adiciona) {
        let serie = Serie(nome);
        Persistencia.adiciona('series', serie);
        series.push(serie);
        adicionaOption(serie)
        sucesso(nome);
    }
    formSerie.reset();
    console.log(localStorage['series']);
    event.preventDefault();
});
formTemporada.selectSeries.addEventListener('click', function(event) {
    const nome = formTemporada.selectSeries.value;
    let serieSelecionada = findSerie(nome);
    const span = formTemporada.querySelector('span');
    if (serieSelecionada) {
        span.innerText = serieSelecionada.temporadas.length + 1;
    } else {
        span.innerText = 1;
    }
});
formTemporada.addEventListener('submit', function(event) {
    console.log(true);
    const nome = formTemporada.selectSeries.value;
    let serieSelecionada = findSerie(nome);
    let episodios = [];
    const nEpisodios = formTemporada.nTemporada.value;
    for (let i = 0; i < nEpisodios; i++) {
        episodios.push(Episodio());
    }
    let temporada = Temporada(episodios);
    serieSelecionada.temporadas.push(temporada);
    atualiza(serieSelecionada);
    Persistencia.salva('series', series);
    formTemporada.reset();
    event.preventDefault();
})