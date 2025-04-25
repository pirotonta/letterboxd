import Style from './Modal.module.css';
import Boton from '../Boton/Boton';
import { CircleX } from 'lucide-react';

const Modal = ({ children, cerrarModal }) => {

    return (
        <div className={Style["modal-overlay"]} onClick={cerrarModal}>
            <div className={Style["modal-contenido"]}>
                <div className={Style["el-boton"]}>
                    <Boton texto="Cerrar" icon={CircleX} onClick={cerrarModal}/>
                </div>
                <div className={Style["el-contenido-fr"]} onClick={(event) => event.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;