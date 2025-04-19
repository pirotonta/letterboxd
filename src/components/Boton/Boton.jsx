import './Boton.css';

const Boton = ({ texto, className, icon: Icon, onClick}) => {
    return (
        <button className={`boton ${className}`} >
            <Icon alt={texto} onClick={onClick}/>
        </button>
    );
}

export default Boton;