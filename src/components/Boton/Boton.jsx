import './Boton.css';

const Boton = ({ texto, className, icon: Icon, onClick, ...props}) => {
    return (
        <button className={`boton ${className}`} onClick={onClick} {...props}>
            <Icon alt={texto}/>
        </button>
    );
}

export default Boton;