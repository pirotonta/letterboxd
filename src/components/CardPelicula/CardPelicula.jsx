import './CardPelicula.css';
import Boton from "../Boton/Boton";
import Modal from "../Modalcito/Modal";
import Review from '../Review/Review';
import { Check, Save } from 'lucide-react';
import { XCircle } from 'lucide-react';
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { EyeOff } from 'lucide-react';
import { useState } from 'react';


const CardPelicula = ({ id, imagen, titulo, tipo, director, anio, genero, review, onClickEditarHandler, onClickEliminarHandler }) => {
    const [editarPelicula, setEditarPelicula] = useState(false)
    const [eliminarPelicula, setEliminarPelicula] = useState(false)
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

    const eliminarHandler = () => {
        onClickEliminarHandler(id)
        setEliminarPelicula(false)
    }

    return (
        editarPelicula ? (
            <div className="card-pelicula">
                <img src={imagen} width="150" height="225"></img>
                <form onSubmit={submitHandler} className="form-editar">
                    <input className="img" name="urlImg" value={pelicula.urlImg} onChange={cambiosHandler} />
                    <select name="tipo" value={pelicula.tipo} onChange={cambiosHandler}>
                        <option value="pelicula">pelicula</option>
                        <option value="serie">serie</option>
                    </select>
                    {/* <input name="tipo" value={pelicula.tipo} onChange={cambiosHandler} /> */}
                    <input name="titulo" value={pelicula.titulo} onChange={cambiosHandler} />
                    <input name="director" value={pelicula.director} onChange={cambiosHandler} />
                    <input name="anio" value={pelicula.anio} onChange={cambiosHandler} />
                    {/* <input name="genero" value={pelicula.genero} onChange={cambiosHandler} /> */}
                    <select name="genero" value={pelicula.genero} onChange={cambiosHandler}>
                        <option value="Acción">Acción</option>
                        <option value="Comedia">Comedia</option>
                        <option value="Drama">Drama</option>
                        <option value="Terror">Terror</option>
                        <option value="Romance">Romance</option>
                        <option value="Ciencia Ficción">Ciencia Ficción</option>
                        <option value="Animación">Animación</option>
                        <option value="Fantasía">Fantasía</option>
                    </select>
                    <select name="review" value={pelicula.review} onChange={cambiosHandler}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="no la vi">no la vi</option>
                    </select>
                    <div className="botones-formulario-editar">
                    <Boton texto="Guardar" icon={Save} onClick={submitHandler} />
                    <Boton texto="Cancelar" icon={XCircle} onClick={() => setEditarPelicula(false)} />
                    </div>
                </form>
            </div>
        ) : (
            <div className="tuvequehacerloporelmodal">
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
                            (<EyeOff className="el-ojo"/>)
                            :
                            [1, 2, 3, 4, 5].filter((rating) => (rating <= review)).map((rating) => {
                                return <span key={rating} className="estrella">{'\u2605'}</span>
                            })}

                    </div>
                    {/* agregar componentes de botones con funciones onclick */}
                    <div className="botonesCardPelicula">
                        <Boton texto="Editar contenido" icon={Pencil} onClick={() => setEditarPelicula(true)} />
                        <Boton texto="Eliminar" icon={Trash2} onClick={() => setEliminarPelicula(true)} />
                    </div>
                </div>

                {eliminarPelicula && (
                    <Modal cerrarModal={() => setEliminarPelicula(false)}>
                        <h3 class="elh3delmodal">eliminar la {tipo} {titulo}? &#129402;</h3>
                        <Boton texto="confirmar" icon={Check} onClick={eliminarHandler} />
                        <Boton texto="cancelar" icon={XCircle} onClick={() => setEliminarPelicula(false)} />
                    </Modal>
                )}
            </div>
        )
    )
}

export default CardPelicula;