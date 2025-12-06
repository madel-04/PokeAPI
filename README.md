# PokeAPI Project — Globant Piscine

Este proyecto consiste en una Single Page Application (SPA) desarrollada con **React + TypeScript + Vite** y un backend en **Node.js + Express**, que permite:

- Autenticar usuarios mediante **OAuth2 (Google)**
- Combinar características de diferentes Pokémon
- Generar nuevos Pokémon usando **IA (Pollinations API)**
- Compartir resultados con otros usuarios
- Todo dentro de una arquitectura **mobile-first**, accesible y dockerizada.
# 🎨 Pokémon Creator - Globant Piscine Project

Aplicación web Single-Page Application (SPA) desarrollada con **React + TypeScript + Vite + TailwindCSS** que permite crear y compartir Pokémon únicos usando IA.

---

## 🚀 Características

- ✅ **Autenticación OAuth2** con Google
- ✅ **Creación de Pokémon** combinando base + habilidades
- ✅ **Generación de imágenes con IA** (Pollinations API)
- ✅ **Compartir resultados** mediante URL única
- ✅ **Mobile-first** y responsive
- ✅ **SPA** con navegación (back/forward)
- ✅ **Accesibilidad WCAG 2.1 AA** (parcial)
- ✅ **Dockerizado** (frontend + backend)

---

## 📋 Requisitos

- **Docker** y **Docker Compose**
- **Node.js 22+** (si ejecutas sin Docker)
- **Cuenta de Google Cloud** (para OAuth2)

---

## 🔧 Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone <tu-repositorio>
```

### 2️⃣ Configurar variables de entorno

Copia los archivos de ejemplo:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

Edita los archivos `.env` con tus credenciales:

**`.env` (Frontend)**
```env
VITE_GOOGLE_CLIENT_ID=tu_google_client_id
```

**`backend/.env` (Backend)**
```env
CLIENT_ID=tu_google_client_id
CLIENT_SECRET=tu_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/redirect
```

### 3️⃣ Configurar Google OAuth2

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita **Google+ API**
4. Crea credenciales OAuth 2.0
5. Agrega estos URIs de redirección autorizados:
   - `http://localhost:3000/auth/google/redirect`
   - `http://localhost:5173/auth/callback`

---

## 🐳 Ejecutar con Docker (Recomendado)

```bash
docker-compose up --build
```

**Accede a:**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

**Detener:**
```bash
docker-compose down
docker compose down -v --rmi all 
```

---

## 💻 Ejecutar sin Docker (Desarrollo)

### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
```

### Terminal 2 - Frontend
```bash
npm install
npm run dev
```

---

## 🎯 Uso

1. **Inicia sesión** con tu cuenta de Google
2. **Selecciona una base** (Pikachu, Charmander, Bulbasaur, Squirtle)
3. **Elige una habilidad** (Fire, Water, Flying, Electric, Grass, Ice)
4. **Genera tu Pokémon** haciendo clic en "¡Generar Pokémon!"
5. **Comparte** el resultado copiando la URL

---

## 📂 Estructura del Proyecto

```
PokeAPI/
├── backend/
│   ├── server.js          # Servidor Express
│   ├── Dockerfile
│   └── .env.example
├── src/
│   ├── components/        # Componentes React
│   ├── pages/            # Páginas de la SPA
│   ├── services/         # Servicios (API calls)
│   ├── context/          # Context API (Auth)
│   └── router/           # Configuración de rutas
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

## 🔒 Seguridad

- ✅ **JWT** para autenticación
- ✅ **Variables de entorno** protegidas
- ✅ **API keys no expuestas** en el frontend
- ✅ **OAuth2** con Google
- ✅ **CORS** configurado

---

## ♿ Accesibilidad

- ✅ **ARIA labels** y roles
- ✅ **Contraste de colores** WCAG AA
- ✅ **Navegación por teclado**
- ✅ **Texto alternativo** en imágenes
- ✅ **Responsive design** mobile-first

---

## 🛠️ Tecnologías

### Frontend
- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- TailwindCSS 4.1.17
- React Router 7.10.1
- Axios 1.13.2

### Backend
- Node.js 22
- Express 5.2.1
- JWT (jsonwebtoken 9.0.3)
- Axios 1.13.2
- dotenv 17.2.3

### Infraestructura
- Docker
- Docker Compose

---

## 📝 Licencia

Este proyecto fue desarrollado como parte del **Globant Piscine - Project 3**.

---

## 👤 Autor

Mayte Isabel del Valle García

---

## 🙏 Agradecimientos

- [PokeAPI](https://pokeapi.co/) - API de Pokémon
- [Pollinations AI](https://pollinations.ai/) - Generación de imágenes
- Globant por la oportunidad