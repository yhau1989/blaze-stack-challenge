## Blaze Stack Challenge – Frontend

### Quick Start

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
   The app will run at [http://localhost:8081](http://localhost:8081).

---

### Tech Stack & Architecture

- **React 19** (with TypeScript) for UI and state management
- **Vite** for fast development/build tooling
- **TailwindCSS** for styling
- **React Hook Form** for form handling

The app is structured with pages (`src/pages`), reusable components (`src/components`), hooks (`src/hooks`), and type definitions (`src/types`). API calls are made to a backend via environment variable `VITE_API_URL`.

---

### Tradeoffs & Assumptions

- Assumes a backend exists at `VITE_API_URL` with `/api/incidents` endpoints for GET/POST.
- Minimal error handling and validation for brevity.
- No authentication or user management.
- UI/UX is functional but not fully polished.

---

### What’s Done

- Incident creation form with image upload and preview
- Dashboard listing all incidents
- Basic routing and navigation
- Responsive, clean UI with TailwindCSS

---

### What Could Be Added With More Time

- Authentication and user roles
- Edit/delete incidents
- Pagination and filtering on dashboard
- More robust error handling and form validation
- Unit and integration tests
- Improved accessibility and mobile UX
