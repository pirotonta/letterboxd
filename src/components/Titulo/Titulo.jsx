import './Titulo.css';

const Titulo = ({texto, logo}) => {
    return (
        <div className="barra-titulo">
            <img src={logo}></img>
            <h1 className="titulo">
                {texto}
            </h1>
        </div>
    );
}

export default Titulo;