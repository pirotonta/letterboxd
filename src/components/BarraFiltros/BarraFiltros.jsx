import Style from './BarraFiltros.module.css';

const BarraFiltros = ({ cambioFiltro, filtro }) => {

    return (
        <div className={Style.barrafiltros}>
            <label htmlFor="genero">Género:</label>
            <select id="genero" onChange={(event) => cambioFiltro("genero", event.target)}>
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
            <input type="checkbox" checked={filtro.tipo.includes('pelicula')} name="tipo" value="pelicula" onChange={(event) => cambioFiltro("tipo", event.target)} /> Película
            <input type="checkbox" checked={filtro.tipo.includes('serie')} name="tipo" value="serie" onChange={(event) => cambioFiltro("tipo", event.target)} /> Serie
        </div>
    )


}

export default BarraFiltros;