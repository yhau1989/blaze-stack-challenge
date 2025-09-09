# Blaze Stack Challenge Backend

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm run start
   ```
   The API will be available at `http://localhost:3000` by default.

## Tech Stack & Architecture

- **Node.js** with **Express** for the REST API.
- **TypeScript** for type safety and maintainability.
- **Zod** for schema validation.
- Data is stored in a local JSON file (`data/incidents.json`).
- File uploads are saved in the `uploads/` directory.

The app is structured with clear separation: routes, types, and utility functions. All incident-related logic is modularized for scalability.

## Tradeoffs & Assumptions

- Data persistence uses a flat JSON file for simplicity; not suitable for high concurrency or large datasets.
- No authentication or authorization implemented.
- Assumes local development; not production-hardened (e.g., no rate limiting, no HTTPS).
- File uploads are stored locally, not in cloud storage.

## What’s Done

- Incident CRUD API endpoints.
- File upload support for incident images.
- Type-safe validation and error handling.

## What Could Be Added With More Time

- Switch to a real database (e.g., PostgreSQL).
- Add authentication & authorization.
- Implement pagination, filtering, and search for incidents.
- Add automated tests and CI/CD.
- Improve error handling and logging.
- Deploy to cloud (e.g., Vercel, AWS).
