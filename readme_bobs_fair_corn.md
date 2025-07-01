# 🌽 Bob's Fair Corn

**Bob's Fair Corn** es una aplicación web que simula un sistema de compra de maíz con reglas simples y una interfaz amigable. Ideal para demostrar conceptos de frontend, backend y persistencia de datos.

---

## 🚀 Características

- Compra limitada a **1 maíz por minuto por cliente**
- Interfaz **simple, amigable y responsiva**
- **Persistencia local** usando `localStorage`
- **Validación en backend** con restricción de tiempo

---

## 🛠 Tecnologías Utilizadas

### Frontend (React)

- [React 18](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) para peticiones HTTP
- `localStorage` para persistencia local

### Backend (Node.js/Express)

- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/) para almacenamiento
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) para permitir conexiones del frontend
- Pool de conexiones con `pg` para eficiencia

---

## 📦 Requisitos

- Node.js **v16+**
- PostgreSQL **v12+**
- NPM o Yarn

---

## 🔧 Instalación

### Backend

1. Crear un archivo `.env` en la raíz del backend con el siguiente contenido:

```env
DB_USER=tu_usuario
DB_HOST=localhost
DB_DATABASE=bobs_corn
DB_PASSWORD=tu_contraseña
DB_PORT=5432
PORT=3001
```

2. Ejecutar:

```bash
cd backend
npm install
npm start
```

### Frontend

1. Crear un archivo `.env` en la raíz del frontend con:

```env
REACT_APP_API_URL=http://localhost:3001
```

2. Ejecutar:

```bash
cd frontend
npm install
npm start
```

---

## 🗃 Estructura de la Base de Datos

Ejecutar el siguiente SQL en PostgreSQL:

```sql
CREATE TABLE purchase_logs (
    client_id VARCHAR(255) PRIMARY KEY,
    last_purchase_at TIMESTAMP NOT NULL
);
```

---

## 🧪 Uso de la Aplicación

1. Ingresa tu nombre o nickname
2. Haz clic en el botón **"Buy One Corn"**
3. El sistema te responderá si la compra fue exitosa o si debes esperar un minuto

---

## 📜 Reglas de Negocio

- Cada cliente puede comprar **1 maíz por minuto**
- El conteo local de maíces se guarda en tu navegador
- El backend mantiene el último tiempo de compra por `client_id`


