import Style from './Boton.module.css';

const Boton = ({ texto, className = '', icon: Icon, onClick, ...props}) => {
    const laClaseArmada = `${Style.boton} ${className === 'active' ? Style.active : ''}`.trim();
    return (
        <button className={laClaseArmada} onClick={onClick} {...props}>
            <Icon alt={texto}/>
        </button>
    );
}

export default Boton;