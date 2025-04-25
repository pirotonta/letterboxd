import Style from './Titulo.module.css';

const Titulo = ({texto, logo}) => {
    return (
        <div className={Style["barra-titulo"]}>
            <img src={logo}></img>
            <h1 className={Style.titulo}>
                {texto}
            </h1>
        </div>
    );
}

export default Titulo;