import './Home.css'
import Titulo from '../components/Titulo/Titulo.jsx'
import FormularioEntrada from '../components/FormularioEntrada/FormularioEntrada.jsx'
import CardPelicula from '../components/CardPelicula/CardPelicula.jsx'
import BarraBusqueda from '../components/BarraBusqueda/BarraBusqueda.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import BarraBotones from '../components/BarraBotones/BarraBotones.jsx'
import BarraFiltros from '../components/BarraFiltros/BarraFiltros.jsx'
import Modal from '../components/Modalcito/Modal.jsx'
import usePelicula from '../hooks/usePelicula.jsx'
import GatoContador from '../components/GatoContador/GatoContador.jsx'

var Home = () => {
    const {peliculas, agregarPelicula, editarPelicula, eliminarPelicula} = usePelicula()
    const [peliculasFiltradas, setPeliculasFiltradas] = useState([]);
    const [filtro, setFiltro] = useState({ barraBusqueda: "", genero: null, tipo: ["pelicula", "serie"], vistas: null, ordenAlfabetico: null, ordenReview: null, ordenFecha: null });
    const [filtroBotones, setFiltroBotones] = useState([]);
    const [agregarNuevaPelicula, setAgregarNuevaPelicula] = useState(false);


    // para mostrar y ocultar el form con botoncitos
    const mostrarFormularioNuevaPelicula = (agregarNuevaPelicula) => {
        if (!agregarNuevaPelicula) {
            setAgregarNuevaPelicula(true);
        }
    }

    const ocultarFormularioNuevaPelicula = (agregarNuevaPelicula) => {
        if (agregarNuevaPelicula) {
            setAgregarNuevaPelicula(false);
        }
    }

    const submitFormularioEntradaHandler = (submit) => {
        submit.preventDefault()
        var formData = new FormData(submit.target)
        const data = Object.fromEntries(formData.entries())
        agregarPelicula(data)
        setAgregarNuevaPelicula(false)
    }

    const onClickEditarHandler = (peliculaModificada) => {
        editarPelicula(peliculaModificada)
    };

    const onClickEliminarHandler = (id) => {
        eliminarPelicula(id)
    }

    const busquedaHandler = (texto) => {
        setFiltro(prev => ({
            ...prev,
            barraBusqueda: texto
        }));
    };

    const filtroGeneroTipoHandler = (filtroKey, target) => {
        setFiltro(prev => {
            const valor = target.value;

            const nuevoFiltro = filtroKey === "tipo" ? {
                ...prev,
                [filtroKey]: target.checked
                    ? [...(prev.tipo || []), valor]
                    : (prev.tipo || []).filter(item => item !== valor)
            } : {
                ...prev,
                [filtroKey]: valor || null
            };


            return nuevoFiltro;
        });
    };




    useEffect(() => {

        const nuevoFiltroBotones = { ...filtro, ordenAlfabetico: null, ordenReview: null, vistas: null, ordenFecha: null }

        if (filtroBotones.includes("AZ")) {
            nuevoFiltroBotones.ordenAlfabetico = "AZ"
        } else if (filtroBotones.includes("ZA")) {
            nuevoFiltroBotones.ordenAlfabetico = "ZA"
        }

        if (filtroBotones.includes("01")) {
            nuevoFiltroBotones.ordenReview = "01"
        } else if (filtroBotones.includes("10")) {
            nuevoFiltroBotones.ordenReview = "10"
        }

        if (filtroBotones.includes("vistas")) {
            nuevoFiltroBotones.vistas = "vistas"
        } else if (filtroBotones.includes("noVistas")) {
            nuevoFiltroBotones.vistas = "noVistas"
        }

        if (filtroBotones.includes("fechaDesc")) {
            nuevoFiltroBotones.ordenFecha = "fechaDesc"
        } else if (filtroBotones.includes("fechaAsc")){
            nuevoFiltroBotones.ordenFecha = "fechaAsc"
        }

        setFiltro(nuevoFiltroBotones)

    }, [filtroBotones]);


    useEffect(() => {
        const peliculasFiltradas = peliculas.filter((pelicula) => {

            const peliculasBusqueda = !filtro.barraBusqueda || pelicula.titulo.toLowerCase().includes(filtro.barraBusqueda.toLowerCase())
            || pelicula.director.toLowerCase().includes(filtro.barraBusqueda.toLowerCase())
            const peliculasGenero = !filtro.genero || pelicula.genero === filtro.genero
            const peliculasTipo = !filtro.tipo || filtro.tipo.includes(pelicula.tipo)
            const peliculasVistas = !filtro.vistas ||
                (filtro.vistas === "vistas" && pelicula.review !== "no la vi") ||
                (filtro.vistas === "noVistas" && pelicula.review === "no la vi")

            return peliculasBusqueda && peliculasGenero && peliculasTipo && peliculasVistas
        });

        const peliculasOrdenadas = [...peliculasFiltradas];

        if (filtro.ordenAlfabetico) {
            const ascendente = filtro.ordenAlfabetico === "AZ";
            peliculasOrdenadas.sort((a, b) =>
                ascendente ? a.titulo.localeCompare(b.titulo) : b.titulo.localeCompare(a.titulo)
            );
        }

        if (filtro.ordenReview) {
            const ascendente = filtro.ordenReview === "01";
            peliculasOrdenadas.sort((a, b) => {
                // el -1 y 6 para mandarlas al top o al bottom
                const aVal = a.review === "no la vi" ? (ascendente ? 6 : -1) : Number(a.review);
                const bVal = b.review === "no la vi" ? (ascendente ? 6 : -1) : Number(b.review);
                return ascendente ? aVal - bVal : bVal - aVal;
            });
        }

        if (filtro.ordenFecha){
            const ascendente = filtro.ordenFecha === "fechaAsc";
            peliculasOrdenadas.sort((a, b) =>
                ascendente ? a.anio - b.anio : b.anio - a.anio
            );
        }

        setPeliculasFiltradas(peliculasOrdenadas);
    }, [peliculas, filtro]);


    return (
        <div className="principal">
            <Titulo texto="pelis & series" logo="https://i.imgur.com/n2PlzFV.png" />

            <div className="barras-filtrado">
                <GatoContador peliculas={peliculas}/>
                <BarraBusqueda setBusqueda={busquedaHandler} />
                <BarraFiltros filtro={filtro} cambioFiltro={filtroGeneroTipoHandler} />
                <BarraBotones onClickNuevaPelícula={() => mostrarFormularioNuevaPelicula(agregarNuevaPelicula)}
                    filtroBotonHandler={setFiltroBotones} />
            </div>

            {agregarNuevaPelicula && (
                <Modal cerrarModal={ocultarFormularioNuevaPelicula}>
                    <FormularioEntrada onSubmit={submitFormularioEntradaHandler} />
                </Modal>
            )}

            <div className="contador-filtradas">
                mostrando {peliculasFiltradas.length} de {peliculas.length} películas/series
            </div>

            <div className="contenedor-pelis">
                {peliculasFiltradas.length > 0 ? (
                    (peliculasFiltradas.map((pelicula) => {
                        return (
                            <CardPelicula key={pelicula.id} id={pelicula.id} imagen={pelicula.urlImg}
                                titulo={pelicula.titulo} tipo={pelicula.tipo} director={pelicula.director} anio={pelicula.anio}
                                genero={pelicula.genero} review={pelicula.review}
                                onClickEditarHandler={onClickEditarHandler} onClickEliminarHandler={onClickEliminarHandler}
                            />
                        )
                    }))
                ) : (
                    <div className="no-hay-pelis"> No hay películas o series para mostrar.</div>
                )}
            </div>
        </div>
    );
}

export default Home