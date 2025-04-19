import './Modal.css';
import Boton from '../Boton/Boton';
import { CircleX } from 'lucide-react';

const Modal = ({ children, cerrarModal }) => {

    return (
        <div className="modal-overlay" onClick={cerrarModal}>
            <div className="modal-contenido">
                <div className="el-boton">
                    <Boton texto="Cerrar" icon={CircleX} onClick={cerrarModal} className="boton-cerrar" />
                </div>
                <div className="el-contenido-fr" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;