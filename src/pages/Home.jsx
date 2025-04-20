import './Home.css'
import Titulo from '../components/Titulo/Titulo.jsx'
import FormularioEntrada from '../components/FormularioEntrada/FormularioEntrada.jsx'
import CardPelicula from '../components/CardPelicula/CardPelicula.jsx'
import BarraBusqueda from '../components/BarraBusqueda/BarraBusqueda.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import BarraBotones from '../components/BarraBotones/BarraBotones.jsx'
import BarraFiltros from '../components/BarraFiltros/BarraFiltros.jsx'
import Modal from '../components/Modalcito/Modal.jsx'


var Home = () => {

    const [peliculas, setPeliculas] = useState([]);
    const [peliculasFiltradas, setPeliculasFiltradas] = useState([]);
    const [filtro, setFiltro] = useState({ barraBusqueda: "", genero: null, tipo: ["pelicula", "serie"], vistas: null, ordenAlfabetico: null, ordenReview: null });
    const [filtroBotones, setFiltroBotones] = useState([]);
    const [agregarNuevaPelicula, setAgregarNuevaPelicula] = useState(false);

    // cargo el localstorage en la renderizacion inicial
    useEffect(() => {
        const peliculasGuardadas = []
        for (var i = 0; i < localStorage.length; i++) {
            const pelicula = JSON.parse(localStorage.getItem(i))
            peliculasGuardadas.push(pelicula)
        }
        setPeliculas(peliculasGuardadas)
    }
        , [])

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
        var cantidadPelis = localStorage.length
        var formData = new FormData(submit.target)
        formData.append('id', cantidadPelis)
        const data = Object.fromEntries(formData.entries())
        localStorage.setItem(cantidadPelis, JSON.stringify(data))
        // reemplazo el array peliculas por una copia de peliculas y la pelicula ingresada
        setPeliculas([...peliculas, data])
        ocultarFormularioNuevaPelicula(agregarNuevaPelicula)
    }

    const onClickEditarHandler = (peliculaModificada) => {
        setPeliculas(peliculas.map(
            (pelicula) => pelicula.id === peliculaModificada.id ? peliculaModificada : pelicula
        ));
        localStorage.setItem(peliculaModificada.id, JSON.stringify(peliculaModificada))
    };

    const onClickEliminarHandler = (idEliminado) => {
        if (confirm("desea eliminar esta película?")) {
            setPeliculas(peliculas.filter((pelicula) => {
                pelicula.id !== idEliminado
            }));
            localStorage.removeItem(idEliminado)
        } else console.log("aa")
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

        const nuevoFiltroBotones = { ...filtro, ordenAlfabetico: null, ordenReview: null, vistas: null }

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

        setFiltro(nuevoFiltroBotones)

    }, [filtroBotones]);


    useEffect(() => {
        const peliculasFiltradas = peliculas.filter((pelicula) => {

            const peliculasBusqueda = !filtro.barraBusqueda || pelicula.titulo.toLowerCase().includes(filtro.barraBusqueda.toLowerCase())
            const peliculasGenero = !filtro.genero || pelicula.genero === filtro.genero
            const peliculasTipo = !filtro.tipo || filtro.tipo.includes(pelicula.tipo)
            const peliculasVistas = !filtro.vistas ||
                (filtro.vistas === "vistas" && pelicula.review !== "no la vi") ||
                (filtro.vistas === "noVistas" && pelicula.review === "no la vi")

            return peliculasBusqueda && peliculasGenero && peliculasTipo && peliculasVistas
        });

        const peliculasOrdenadas = [...peliculasFiltradas];

        if (filtro.ordenAlfabetico === "AZ") {
            peliculasOrdenadas.sort((a, b) => a.titulo.localeCompare(b.titulo));
        } else if (filtro.ordenAlfabetico === "ZA") {
            peliculasOrdenadas.sort((a, b) => b.titulo.localeCompare(a.titulo));
        }

        if (filtro.ordenReview === "01") {
            peliculasOrdenadas.sort((a, b) => Number(a.review) - Number(b.review));
        } else if (filtro.ordenReview === "10") {
            peliculasOrdenadas.sort((a, b) => Number(b.review) - Number(a.review));
        }

        setPeliculasFiltradas(peliculasOrdenadas);
    }, [peliculas, filtro]);


    return (
        <div className="principal">
            <Titulo texto="letracajxd" logo="src\assets\letracajxd.png" />

            <div className="barras-filtrado">
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


            <div className="contenedor-pelis">
                {peliculasFiltradas.length > 0 ? (
                    (peliculasFiltradas.map((pelicula) => {
                        return (
                            <CardPelicula key={pelicula.id} id={pelicula.id} imagen={pelicula.urlImg}
                                titulo={pelicula.titulo} tipo={pelicula.tipo} director={pelicula.director} anio={pelicula.anio}
                                genero={pelicula.genero} review={pelicula.review}
                                onClickEditarHandler={onClickEditarHandler} onClickEliminarHandler={() => onClickEliminarHandler(pelicula.id)}
                            />
                        )
                    }))
                ) : (
                    <div className="no-hay-pelis"> No hay peliculas </div>
                )}
            </div>


        </div>
    );
}

export default Home