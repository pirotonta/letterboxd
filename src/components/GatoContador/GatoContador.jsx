import React from 'react';
import { useState } from 'react';
import './GatoContador.css';

const GatoContador = ({ peliculas }) => {

    const [gatoVista, setGatoVistas] = useState(true);

    const contar = (tipo, vista) => {
        return peliculas.filter(
            (p) => p.tipo === tipo && (vista ? p.review !== "no la vi" : p.review === "no la vi")
        ).length;
    };

    const noVistasPeliculas = contar("pelicula", false);
    const vistasPeliculas = contar("pelicula", true);
    const noVistasSeries = contar("serie", false);
    const vistasSeries = contar("serie", true);

    const mostrarTexto = (cantidadPeliculas, cantidadSeries, criterio) => {
        
        let texto = []
        let textoFinal = "";

        if (cantidadPeliculas > 0) {
            texto.push(`${cantidadPeliculas} ${cantidadPeliculas > 1 ? "peliculas" : "pelicula"}`);
        }

        if (cantidadSeries > 0) {
            texto.push(`${cantidadSeries} ${cantidadSeries > 1 ? "series" : "serie"}`);
        }

        if (texto.length === 0){
            (criterio === "vistas") ? textoFinal = "no viste ninguna peli ni serie!" : textoFinal = "no tenés nada en tu watchlist!"
        } else {
            const textoJuntito = texto.join(" y ");
            (criterio === "vistas") ? textoFinal = `ya viste ${textoJuntito}!` : textoFinal = `tenés ${textoJuntito} en tu watchlist!`
        }

        return textoFinal;
    };

    const bongoCat = {
        vistas: "https://i.imgur.com/Ybcw3Gv.png",
        noVistas: "https://i.imgur.com/wCELf0p.png"
    }

    const handleClickGato = () => {
        setGatoVistas(!gatoVista);
    }

    return (
        <div className="gato-container">
            <div className="gato-contador">
                <img src={gatoVista ? bongoCat.vistas : bongoCat.noVistas} alt="Gato contador" className="gato-contador-img" onClick={handleClickGato} />
            </div>
            <div className="gato-dialogo">
                <img src="https://i.imgur.com/cqBrsZW.png" alt="dialogo" className="gato-dialogo-img"/>
                <div className="gato-dialogo-text">
                    {gatoVista
                        ? mostrarTexto(vistasPeliculas, vistasSeries, "vistas")
                        : mostrarTexto(noVistasPeliculas, noVistasSeries, "no vistas")}
                </div>
            </div>

        </div>

    );
}

export default GatoContador;