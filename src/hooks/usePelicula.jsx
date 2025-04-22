import { useEffect, useState } from "react";
import mockdata from "../mocks/mockdata.json";

const STORAGE_KEY = "peliculasLetterboxd-vert";

const usePelicula = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [contador, setContador] = useState(0);

    
    useEffect(() => {
        const peliculasGuardadas = localStorage.getItem(STORAGE_KEY);
        if (peliculasGuardadas) {
            const peliculasGuardadasParseadas = JSON.parse(peliculasGuardadas);
            setPeliculas(peliculasGuardadasParseadas);
            contarPeliculas(peliculasGuardadasParseadas)
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mockdata));
            setPeliculas(mockdata);
            contarPeliculas(mockdata)
        }
    }, []);

    const contarPeliculas = (peliculas) => {
        const idMaximo = peliculas.reduce((max, peli) => {
          const idNumerico = Number(peli.id);
          return isNaN(idNumerico) ? max : Math.max(max, idNumerico);
        }, 0);
        setContador(idMaximo);
    };

    const agregarPelicula = (dataPelicula) => {
        const nextId = contador + 1;
        const nuevaPelicula = {...dataPelicula, id: nextId};
        const nuevasPeliculas = [...peliculas, nuevaPelicula];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasPeliculas));
        setPeliculas(nuevasPeliculas);
        setContador(nextId);
    };

    const editarPelicula = (peliculaModificada) => {
        const nuevasPeliculas = peliculas.map((p) =>
          p.id === peliculaModificada.id ? peliculaModificada : p
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasPeliculas));
        setPeliculas(nuevasPeliculas);
    };

    const eliminarPelicula = (id) => {
        const nuevasPeliculas = peliculas.filter((p) => p.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasPeliculas));
        setPeliculas(nuevasPeliculas);
    };


    return {
        peliculas,
        agregarPelicula,
        editarPelicula,
        eliminarPelicula,
        contador,
    };
}

export default usePelicula;