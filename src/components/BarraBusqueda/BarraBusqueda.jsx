import Style from './BarraBusqueda.module.css';

const BarraBusqueda = ({ setBusqueda }) => {
  const handleChange = (cambio) => {
    setBusqueda(cambio.target.value);
  };

  return (
    <div className={Style.barrabusqueda}>
      <input
        type="text"
        placeholder="buscar..."
        onChange={handleChange}
      />
    </div>
  );
}

export default BarraBusqueda;