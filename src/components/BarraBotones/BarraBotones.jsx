import './BarraBotones.css';
import Boton from "../Boton/Boton";
import { CalendarArrowDown, CalendarArrowUp, CirclePlus } from "lucide-react";
import { ArrowDownAz } from "lucide-react";
import { ArrowUpAZ } from "lucide-react";
import { ArrowDown01 } from "lucide-react";
import { ArrowUp01 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from 'react';


const BarraBotones = ({ onClickNuevaPelícula, filtroBotonHandler }) => {

    const [botonesActivos, setBotonesActivos] = useState([])

    const handleBotonClick = (botonCliqueao) => {
        const mutuamenteExclusivos = {
            AZ: ["ZA"],
            ZA: ["AZ"],
            "01": ["10"],
            "10": ["01"],
            "vistas": ["noVistas"],
            "noVistas": ["vistas"],
            "fechaDesc": ["fechaAsc"],
            "fechaAsc": ["fechaDesc"],
        };

        setBotonesActivos(prev => {
            let nuevosBotones;

            if (botonCliqueao === "vistas" || botonCliqueao === "noVistas") {
                if (!prev.includes("vistas") && !prev.includes("noVistas")) {
                    nuevosBotones = [...prev, "vistas"];
                } else if (prev.includes("vistas")) {
                    nuevosBotones = [...prev.filter(botonActivo => botonActivo !== "vistas"), "noVistas",];
                } else if (prev.includes("noVistas")) {
                    nuevosBotones = prev.filter(botonActivo => botonActivo !== "noVistas");
                }
            } else {

                const exclusivos = mutuamenteExclusivos[botonCliqueao] || [];
                const sinExclusivos = prev.filter(botonActivo => !exclusivos.includes(botonActivo));

                if (prev.includes(botonCliqueao)) {
                    nuevosBotones = sinExclusivos.filter(botonActivo => botonActivo !== botonCliqueao);
                } else {
                    nuevosBotones = [...sinExclusivos, botonCliqueao];
                }
            }

            filtroBotonHandler(nuevosBotones);

            return nuevosBotones;
        });

    };

    return (
        <div className="barra-botones">
            <Boton texto="Agregar película" icon={CirclePlus} onClick={onClickNuevaPelícula} />
            <Boton texto="Ordenar alfabéticamente" icon={ArrowDownAz}
                onClick={() => { handleBotonClick("AZ") }} className={botonesActivos.includes("AZ") ? 'active' : ''} />
            <Boton texto="Ordenar por reseña" icon={ArrowDown01}
                onClick={() => handleBotonClick("01")} className={botonesActivos.includes("01") ? 'active' : ''} />
            <Boton texto="Ordenar por fecha" icon={CalendarArrowDown}
                onClick={() => handleBotonClick("fechaDesc")} className={botonesActivos.includes("fechaDesc") ? 'active' : ''} />
            <Boton texto="Vistas/no vistas" icon={botonesActivos.includes("noVistas") ? EyeOff : Eye}
                onClick={() => { handleBotonClick("vistas") }} className={botonesActivos.includes("vistas") || botonesActivos.includes("noVistas") ? 'active' : ''} />
            <Boton texto="Ordenar alfabéticamente" icon={ArrowUpAZ}
                onClick={() => { handleBotonClick("ZA") }} className={botonesActivos.includes("ZA") ? 'active' : ''} />
            <Boton texto="Ordenar por reseña" icon={ArrowUp01}
                onClick={() => handleBotonClick("10")} className={botonesActivos.includes("10") ? 'active' : ''} />
            <Boton texto="Ordenar por fecha" icon={CalendarArrowUp}
                onClick={() => handleBotonClick("fechaAsc")} className={botonesActivos.includes("fechaAsc") ? 'active' : ''} />
        </div>
    )
}

export default BarraBotones;