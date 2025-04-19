import './CardPelicula.css';
import Boton from "../Boton/Boton";
import { Save } from 'lucide-react';
import { XCircle } from 'lucide-react';
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { EyeOff } from 'lucide-react';
import { useState } from 'react';


const CardPelicula = ({ id, imagen, titulo, tipo, director, anio, genero, review, onClickEditarHandler, onClickEliminarHandler }) => {
    const [editarPelicula, setEditarPelicula] = useState(false)
    const [pelicula, setPelicula] = useState({
        id: id,
        urlImg: imagen,
        titulo: titulo,
        tipo: tipo,
        director: director,
        anio: anio,
        genero: genero,
        review: review
    })

    const cambiosHandler = (modificado) => {
        const { name, value } = modificado.target
        setPelicula({
            ...pelicula,
            [name]: value
        })
    }

    const submitHandler = (submit) => {
        submit.preventDefault()
        onClickEditarHandler(pelicula)
        setEditarPelicula(false)
    }

    return (
        editarPelicula ? (
            <div className="card-pelicula">
                <img src={imagen} width="150" height="225"></img>
                <form onSubmit={submitHandler} className="form-editar">
                    <input name="urlImg" value={pelicula.urlImg} onChange={cambiosHandler} />
                    <input name="tipo" value={pelicula.tipo} onChange={cambiosHandler} />
                    <input name="anio" value={pelicula.anio} onChange={cambiosHandler} />
                    <input name="titulo" value={pelicula.titulo} onChange={cambiosHandler} />
                    <input name="director" value={pelicula.director} onChange={cambiosHandler} />
                    <input name="genero" value={pelicula.genero} onChange={cambiosHandler} />
                    <input name="review" value={pelicula.review} onChange={cambiosHandler} />
                    <Boton texto="Guardar" icon={Save} onClick={submitHandler} />
                    <Boton texto="Cancelar" icon={XCircle} onClick={() => setEditarPelicula(false)} />
                </form>
            </div>
        ) : (
            <div className="card-pelicula">
                <img src={imagen} width="150" height="225"></img>
                <h3>{titulo}</h3>
                <div className="p">
                    <h4>tipo:</h4> {tipo} | <h4>año:</h4> {anio}
                    <br></br>
                    <h4>director:</h4> {director}
                    <br></br>
                    <h4>género:</h4> {genero}
                    <br></br>
                    <h4>review: </h4>
                    {(review == "no la vi") ?
                        (<EyeOff />)
                        :
                        [1, 2, 3, 4, 5].filter((rating) => (rating <= review)).map((rating) => {
                            return <span key={rating} className="estrella">{'\u2605'}</span>
                        })}

                </div>
                {/* agregar componentes de botones con funciones onclick */}
                <div className="botonesCardPelicula">
                    <Boton texto="Editar contenido" icon={Pencil} onClick={() => setEditarPelicula(true)} />
                    <Boton texto="Eliminar" icon={Trash2} onClick={onClickEliminarHandler} />
                </div>
            </div>
        )
    )
}

export default CardPelicula;