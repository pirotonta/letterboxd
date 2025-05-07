import Style from './FormularioEntrada.module.css';
import Review from "../Review/Review";
import Boton from "../Boton/Boton";
import { Save } from 'lucide-react';

const FormularioEntrada = ({ onSubmit }) => {
  return (
    <div className={Style.nuevaPelicula}>
      <h4>Nueva entrada</h4>
      <form className={Style["form-entrada"]} onSubmit={onSubmit}>
        <div className={Style["radio-tipo"]}>
          <label htmlFor="tipo">Tipo</label>
          <input required type="radio" name="tipo" value="pelicula" /> Película
          <input required type="radio" name="tipo" value="serie" /> Serie
        </div>
        <br></br>
        <label htmlFor="titulo">Titulo</label>
        <input required type="text" name="titulo" placeholder="titulo" />
        <label htmlFor="director">Director</label>
        <input required type="text" name="director" placeholder="director" />
        <label htmlFor="anio">Año</label>
        {/* anio deberia ser number */}
        <input required type="text" name="anio" placeholder="año" />
        <label htmlFor="genero">Género</label>
        <select required name="genero" id="genero">
          <option value="Acción">Acción</option>
          <option value="Comedia">Comedia</option>
          <option value="Drama">Drama</option>
          <option value="Terror">Terror</option>
          <option value="Romance">Romance</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
          <option value="Animación">Animación</option>
          <option value="Fantasía">Fantasía</option>
        </select>
        <label htmlFor="urlImg">URL Imagen</label>
        <input required type="text" name="urlImg" placeholder="url imagen" />
        <label htmlFor="review">Review</label>
        <Review />
        <br></br>
        <Boton texto="enviar" icon={Save} type="submit" />
      </form>
    </div>
  );
}

export default FormularioEntrada;