const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');

dotenv.config();

const serviceAccount = require('./config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/needs', async (req, res) => {
  try {
    const snapshot = await db.collection('needs').get();
    const needs = [];
    snapshot.forEach(doc => {
      needs.push({ id: doc.id, ...doc.data() });
    });
    res.json({ success: true, data: needs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/needs', async (req, res) => {
  try {
    const needData = {
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending'
    };
    const docRef = await db.collection('needs').add(needData);
    res.json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/needs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    await db.collection('needs').doc(id).update(updatedData);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/needs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('needs').doc(id).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/alerts', async (req, res) => {
  try {
    const { phone, message } = req.body;
    console.log(`Enviando WhatsApp a ${phone}: ${message}`);
    res.json({ 
      success: true, 
      message: 'Alerta enviada exitosamente (simulación)' 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'El servidor está funcionando' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
  console.log(`📍 Verificación: http://localhost:${PORT}/api/health`);
});