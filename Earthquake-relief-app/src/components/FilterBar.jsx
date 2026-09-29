import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="needType">Tipo:</label>
        <select
          id="needType"
          name="needType"
          value={filters.needType}
          onChange={handleChange}
        >
          <option value="all">Todos</option>
          <option value="water">💧 Agua</option>
          <option value="food">🍞 Alimentos</option>
          <option value="medicine">💊 Medicinas</option>
          <option value="shelter">🏠 Alojamiento</option>
          <option value="other">📦 Otros</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="urgency">Urgencia:</label>
        <select
          id="urgency"
          name="urgency"
          value={filters.urgency}
          onChange={handleChange}
        >
          <option value="all">Todas</option>
          <option value="critical">🔴 Crítica</option>
          <option value="high">🟠 Alta</option>
          <option value="medium">🟡 Media</option>
          <option value="low">🟢 Baja</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="status">Estado:</label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="pending">Pendientes</option>
          <option value="all">Todos</option>
          <option value="fulfilled">Cumplidos</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;