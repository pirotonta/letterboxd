import './Boton.css';

const Boton = ({ texto, className, icon: Icon, onClick}) => {
    return (
        <button className={`boton ${className}`} onClick={onClick}>
            <Icon alt={texto}/>
        </button>
    );
}

export default Boton;