import React, { useState } from 'react';
import { addNeed } from '../services/firebase';

const NeedForm = ({ onSubmitSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    needType: 'water',
    urgency: 'medium',
    details: '',
    location: {
      lat: 4.8133,
      lng: -75.6961,
      address: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, [name]: parseFloat(value) }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.phone || !formData.location.address) {
      setError('Por favor completa el teléfono y la dirección');
      setLoading(false);
      return;
    }

    const result = await addNeed(formData);
    
    if (result.success) {
      setSuccess(true);
      if (onSubmitSuccess) onSubmitSuccess(result.id);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <div className="success-message">
        <h2>✅ ¡Necesidad registrada!</h2>
        <p>Tu solicitud ha sido enviada. Te contactaremos pronto por WhatsApp.</p>
        <button onClick={onClose} className="btn-primary">
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="need-form">
      <h2>📋 Reportar Necesidad</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        Completa este formulario para solicitar ayuda después del terremoto
      </p>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Nombre (opcional)</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Teléfono WhatsApp *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+57 300 123 4567"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="needType">Tipo de Necesidad *</label>
        <select
          id="needType"
          name="needType"
          value={formData.needType}
          onChange={handleChange}
          required
        >
          <option value="water">💧 Agua</option>
          <option value="food">🍞 Alimentos</option>
          <option value="medicine">💊 Medicinas</option>
          <option value="shelter">🏠 Alojamiento</option>
          <option value="other">📦 Otros</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="urgency">Nivel de Urgencia *</label>
        <select
          id="urgency"
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          required
        >
          <option value="low">🟢 Baja</option>
          <option value="medium">🟡 Media</option>
          <option value="high">🟠 Alta</option>
          <option value="critical">🔴 Crítica</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="address">Dirección *</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.location.address}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            location: { ...prev.location, address: e.target.value }
          }))}
          placeholder="Calle 15 #23-45, Pereira"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="details">Detalles Adicionales</label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Ej: Familia de 5 personas, sin agua desde hace 2 días..."
          rows="4"
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} className="btn-secondary">
          Cancelar
        </button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </div>
    </form>
  );
};

export default NeedForm;