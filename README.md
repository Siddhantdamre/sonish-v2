# Sonish V2 — MERN E-Commerce

A full-stack e-commerce application built with the **MERN** stack (MongoDB, Express, React, Node.js).

---

## Project Structure

```
sonish-v2/
├── frontend/   # React (Vite) + Tailwind CSS v4 + Framer Motion
├── backend/    # Express + Mongoose + Helmet + CORS
└── README.md
```

---

## Prerequisites

| Tool    | Version |
| ------- | ------- |
| Node.js | ≥ 18    |
| npm     | ≥ 9     |
| MongoDB | ≥ 6 (or a MongoDB Atlas connection string) |

---

## Getting Started

### 1. Backend

```bash
cd backend

# Copy the example env file and fill in your values
cp .env.example .env

# Install dependencies (skip if already done)
npm install

# Start the dev server (with hot-reload via nodemon)
npm run dev
```

The API will be available at **http://localhost:5000**.  
Health check: `GET /api/health`

### 2. Frontend

```bash
cd frontend

# Install dependencies (skip if already done)
npm install

# Start the Vite dev server
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## Environment Variables (Backend)

| Variable      | Description                                    | Default                              |
| ------------- | ---------------------------------------------- | ------------------------------------ |
| `PORT`        | Port the Express server listens on             | `5000`                               |
| `MONGO_URI`   | MongoDB connection string                      | `mongodb://localhost:27017/sonish-v2` |
| `CORS_ORIGIN` | Comma-separated list of allowed CORS origins   | `http://localhost:5173`              |

---

## Security Baseline

The backend ships with a hardened security baseline out of the box:

- **Helmet** — sets `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, and other protective HTTP headers.
- **CORS** — strict origin whitelist; only origins listed in `CORS_ORIGIN` are accepted. Methods restricted to `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- **dotenv** — secrets are loaded from `.env` (never committed to version control).

---

## License

MIT
