# 🆘 Ayuda Terremoto Pereira

Una aplicación web que conecta a las comunidades afectadas por el terremoto en Pereira, Colombia con donantes y coordinadores de ayuda.

## 🎯 Propósito

Después del terremoto de septiembre de 2026 en Pereira, esta plataforma ayuda a:
- **Miembros de la comunidad** a reportar sus necesidades (comida, agua, medicinas, alojamiento)
- **Donantes** a encontrar y apoyar familias necesitadas
- **Coordinadores de ayuda** a gestionar y rastrear los esfuerzos de socorro

## 🚀 Inicio Rápido

### 1. Configurar Firebase

1. Ve a https://console.firebase.google.com
2. Crea un nuevo proyecto
3. Habilita **Firestore Database**
4. Ve a Configuración del Proyecto > General > Tus apps > App web
5. Copia la configuración y actualiza `client/src/config/firebase.js`

### 2. Instalar Dependencias

```bash
# Frontend
cd client
npm install

# Backend (opcional)
cd server
npm install
```

### 3. Ejecutar

```bash
# Frontend
cd client
npm start

# Backend (en otra terminal, opcional)
cd server
npm start
```

La aplicación se abrirá en `http://localhost:3000`

## 🛠️ Tecnologías

- **React 18** - Frontend
- **React-Leaflet** - Mapas
- **Firebase** - Base de datos
- **Node.js + Express** - Backend API

## 📝 Licencia

MIT License - Gratis para usar con fines humanitarios

## 👨‍💻 Autor

Construido por un estudiante de Pereira, Colombia.

**Hecho con ❤️ para Pereira**