# Sonish v2 - MERN Commerce Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-open-2DA44E?style=for-the-badge&logo=githubpages)](https://siddhantdamre.github.io/sonish-v2/)
[![Portfolio Guide](https://img.shields.io/badge/Portfolio-context-0969DA?style=for-the-badge&logo=github)](https://github.com/Siddhantdamre/Siddhantdamre/blob/main/PORTFOLIO.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Sonish v2 is a full-stack e-commerce project built with MongoDB, Express, React, and Node.js. It demonstrates a practical product architecture: frontend storefront, backend API, database persistence, security headers, CORS controls, and a clear deployment path.

## Recruiter Quick Look

| What to check | Why it matters |
| --- | --- |
| [Live surface](https://siddhantdamre.github.io/sonish-v2/) | Product overview and demo direction. |
| `frontend/` | React/Vite frontend structure. |
| `backend/` | Express/Mongoose API structure. |
| `.env.example` | Deployment readiness and secret hygiene. |
| Security baseline | Helmet, CORS, and dotenv usage. |

## Product Scope

- Storefront frontend for browsing commerce flows.
- Express API for backend business logic.
- MongoDB/Mongoose persistence layer.
- Environment-driven configuration.
- Security middleware baseline for deployable APIs.
- Clear split between frontend and backend ownership.

## Project Structure

```text
sonish-v2/
|-- frontend/   # React + Vite + Tailwind + Framer Motion
|-- backend/    # Express + Mongoose + Helmet + CORS
|-- README.md
```

## Run Locally

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The API runs at:

```text
http://localhost:5000
```

Health check:

```text
GET /api/health
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

## Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Express server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/sonish-v2` |
| `CORS_ORIGIN` | Allowed frontend origins | `http://localhost:5173` |

## Security Baseline

- `helmet` for defensive HTTP headers.
- Strict CORS origin configuration.
- `.env` based secret management.
- Backend/frontend separation for safer deployment.

## Current Demo State

The GitHub Pages surface gives reviewers a quick product overview. The next strong version is a hosted Vercel frontend connected to a Render/Railway API with seeded catalog data and demo credentials.

## Roadmap

- Deploy the frontend to Vercel.
- Deploy the backend to Render or Railway.
- Add seeded demo products and demo credentials.
- Add screenshots for storefront, product, cart, admin, and order flows.
- Add API documentation or Swagger/OpenAPI output.

## License

MIT
