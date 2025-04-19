import './BarraFiltros.css';
import React from 'react';

const BarraFiltros = ({ cambioFiltro , filtro}) => {

    return (
        <div className="barra-filtros">
            <label htmlFor="genero">Género:</label>
            <select id="genero" onChange={(e) => cambioFiltro("genero", e.target)}>
                <option value="">Todos</option>
                <option value="Acción">Acción</option>
                <option value="Comedia">Comedia</option>
                <option value="Drama">Drama</option>
                <option value="Terror">Terror</option>
                <option value="Romance">Romance</option>
                <option value="Ciencia Ficción">Ciencia Ficción</option>
                <option value="Animación">Animación</option>
                <option value="Fantasía">Fantasía</option>
            </select><br></br>
            <label htmlFor="ordenar">Tipo:</label>
            <input type="checkbox" checked={filtro.tipo.includes('pelicula')} name="tipo" value="pelicula" onChange={(e) => cambioFiltro("tipo", e.target)} /> Película
            <input type="checkbox" checked={filtro.tipo.includes('serie')} name="tipo" value="serie" onChange={(e) => cambioFiltro("tipo", e.target)} /> Serie
        </div>
    )


}

export default BarraFiltros;