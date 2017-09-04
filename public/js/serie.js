function Serie(nome, temporadas = []) {
    return {
        'nome': nome,
        'temporadas': temporadas,
        'copy': function (serie) {
            serie.temporadas = this.temporadas;
        }
    }
}

function Temporada(episodios = []) {
    return {
        'episodios': episodios
    }
}

function Episodio() {
    return {
        'assistido': false
    }
}