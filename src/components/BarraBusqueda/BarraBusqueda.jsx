import './BarraBusqueda.css';

const BarraBusqueda = ({ setBusqueda }) => {
  const handleChange = (cambio) => {
    setBusqueda(cambio.target.value);
  };

  return (
    <div className="barra-busqueda">
      <input
        type="text"
        placeholder="buscar..."
        onChange={handleChange}
      />
    </div>
  );
}

export default BarraBusqueda;