const ListaPeliculas = (filtro, valor) => {

    var divPeliculas = document.createElement("div")
    divPeliculas.classList.add("div-peliculas")

    if (localStorage.length > 0) {

        localStorage.map((pelicula, index) => {
            var pelicula = JSON.parse(localStorage.getItem(index))
            // revisar esta parte. para integrar state
            if (pelicula[filtro] == valor) {
                var pelicula = document.createElement("div")
                pelicula.classList.add("pelicula-{index}")
                pelicula.innerHTML = '<h3>' + pelicula.titulo + '</h3><br>' + '<h4>' + pelicula.director + '</h4><br>' + '<h5>' + pelicula.anio + '</h5><br>' + '<h6>' + pelicula.genero + '</h6><br>' + '<p>' + pelicula.review + '</p>'
                divPeliculas.appendChild(pelicula)
            }
        }
        )
    } else {
        var pelicula = document.createElement("div")
        pelicula.classList.add("no-hay-peliculas")
        pelicula.innerHTML = '<h3>' + "No hay peliculas" + '</h3>'
        divPeliculas.appendChild(pelicula)
    }

    return divPeliculas
}

export default ListaPeliculas