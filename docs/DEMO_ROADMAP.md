# Demo Upgrade Roadmap

Goal: turn Sonish v2 from a local MERN project into a reviewer-friendly hosted commerce demo.

## Current State

- GitHub Pages surface is live.
- README explains the frontend/backend split and local setup.
- The project has enough structure to become a real hosted demo.

## Highest-Impact Improvements

| Priority | Upgrade | Recruiter value |
| --- | --- | --- |
| P0 | Deploy frontend to Vercel. | Gives recruiters a real app link. |
| P0 | Deploy backend to Render/Railway with seeded demo data. | Shows full-stack deployment ability. |
| P0 | Add demo credentials and seed products. | Makes the app reviewable without setup. |
| P1 | Add screenshots for product, cart, checkout/admin, and auth flows. | Makes README more convincing. |
| P1 | Add API docs or an endpoint table. | Shows backend maturity. |
| P2 | Add CI for lint/build checks. | Signals production discipline. |

## Suggested Demo Shape

- Vercel frontend.
- Render/Railway API.
- MongoDB Atlas demo database with safe seeded data.
- README demo section with credentials and screenshots.

## Definition Of Done

- Reviewer can open a hosted frontend, browse products, and test a safe demo flow.
- Backend health check is public and documented.
- README includes deployment architecture and demo credentials.
