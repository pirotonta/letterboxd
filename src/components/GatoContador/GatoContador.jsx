import React from 'react';
import { useState } from 'react';
import './GatoContador.css';

const GatoContador = ({ peliculas }) => {

    const [gatoVista, setGatoVistas] = useState(false);

    const contar = (tipo, vista) => {
        return peliculas.filter(
            (p) => p.tipo === tipo && (vista ? p.review !== "no la vi" : p.review === "no la vi")
        ).length;
    };

    const noVistasPeliculas = contar("pelicula", false);
    const vistasPeliculas = contar("pelicula", true);
    const noVistasSeries = contar("serie", false);
    const vistasSeries = contar("serie", true);

    const mostrarTexto = (cantidad, tipo) => {
        let texto = "";
        if (tipo === "pelicula"){
            if (cantidad === 1){
                texto += `1 película`;
            } else texto += `${cantidad} películas`;
        }
        if (tipo === "serie"){
            if (cantidad === 1){
                texto += `y 1 serie`;
            } else texto += `y ${cantidad} series`;
        }
        return texto;
    };

    const bongoCat = {
        vistas: "https://i.imgur.com/DshD8Yf.png",
        noVistas: "https://i.imgur.com/imFQVFe.png"
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
                        ? `viste ${mostrarTexto(vistasPeliculas, "pelicula")} ${mostrarTexto(vistasSeries, "serie")}!`
                        : `tenes ${mostrarTexto(noVistasPeliculas, "pelicula")} ${mostrarTexto(noVistasSeries, "serie")} en la watchlist!`}
                </div>
            </div>

        </div>

    );
}

export default GatoContador;