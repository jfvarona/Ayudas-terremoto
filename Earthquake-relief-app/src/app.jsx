import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MapComponent from './components/MapComponent';
import NeedForm from './components/NeedForm';
import FilterBar from './components/FilterBar';
import { getAllNeeds } from './services/firebase';
import './styles/App.css';

const LandingPage = () => {
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [filters, setFilters] = useState({
    needType: 'all',
    urgency: 'all',
    status: 'pending'
  });

  useEffect(() => {
    const loadNeeds = async () => {
      const result = await getAllNeeds();
      if (result.success) {
        setNeeds(result.data);
      }
      setLoading(false);
    };
    loadNeeds();
  }, []);

  const filteredNeeds = needs.filter(need => {
    if (filters.needType !== 'all' && need.needType !== filters.needType) return false;
    if (filters.urgency !== 'all' && need.urgency !== filters.urgency) return false;
    if (filters.status !== 'all' && need.status !== filters.status) return false;
    return true;
  });

  const handleMarkerClick = (need) => {
    setSelectedNeed(need);
  };

  const handleClosePopup = () => {
    setSelectedNeed(null);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <h1>🆘 Ayuda Terremoto Pereira</h1>
          <p>Conectando comunidades afectadas con donantes</p>
          <div className="header-actions">
            <button 
              className="btn-primary" 
              onClick={() => setShowForm(true)}
            >
              📋 Reportar Necesidad
            </button>
            <Link to="/admin" className="btn-secondary">
              Admin
            </Link>
          </div>
        </div>
      </header>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-number">{needs.length}</span>
          <span className="stat-label">Necesidades</span>
        </div>
        <div className="stat">
          <span className="stat-number">
            {needs.filter(n => n.status === 'fulfilled').length}
          </span>
          <span className="stat-label">Cumplidas</span>
        </div>
        <div className="stat">
          <span className="stat-number">
            {needs.filter(n => n.urgency === 'critical').length}
          </span>
          <span className="stat-label">Críticas</span>
        </div>
      </div>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      <div className="map-container">
        <MapComponent needs={filteredNeeds} onMarkerClick={handleMarkerClick} />
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
            <NeedForm 
              onSubmitSuccess={() => {
                getAllNeeds().then(result => {
                  if (result.success) setNeeds(result.data);
                });
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {selectedNeed && (
        <div className="modal-overlay" onClick={handleClosePopup}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClosePopup}>×</button>
            <h2>📍 Detalles de la Necesidad</h2>
            <div className="need-details">
              <p><strong>Tipo:</strong> {selectedNeed.needType}</p>
              <p><strong>Urgencia:</strong> {selectedNeed.urgency}</p>
              <p><strong>Dirección:</strong> {selectedNeed.location.address}</p>
              {selectedNeed.details && (
                <p><strong>Detalles:</strong> {selectedNeed.details}</p>
              )}
              {selectedNeed.phone && (
                <p><strong>Contacto:</strong> {selectedNeed.phone}</p>
              )}
              <button className="btn-primary" onClick={handleClosePopup}>
                Contactar
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Proyecto estudiantil - Pereira, Colombia 2026</p>
        <p>Hecho con ❤️ para ayudar a nuestra comunidad</p>
      </footer>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      <p>Funcionalidad en desarrollo...</p>
      <Link to="/" className="btn-secondary">Volver al Inicio</Link>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;