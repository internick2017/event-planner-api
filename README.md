# Event Planner API

RESTful API for managing events, venues, and RSVPs. Built with Node.js, Express, MongoDB, and OAuth2 Google authentication.

**Live demo:** https://event-planner-api-oihl.onrender.com/api-docs

## Features

- Full CRUD for **Events**, **Venues**, **RSVPs**, and **Users**
- OAuth2 Google authentication via Passport.js
- Interactive Swagger/OpenAPI documentation
- Jest test suite (12 tests across 4 resources)
- Session-based auth with protected write endpoints

## Stack

- **Runtime:** Node.js + Express 5
- **Database:** MongoDB Atlas + Mongoose 9
- **Auth:** Passport.js + Google OAuth2
- **Docs:** Swagger UI (swagger-autogen)
- **Testing:** Jest + Supertest

## Getting started

```bash
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_atlas_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback
SESSION_SECRET=your_session_secret
PORT=8080
```

```bash
npm run dev      # development (nodemon)
npm start        # production
npm test         # run test suite
npm run swagger  # regenerate swagger-output.json
```

API docs available at `http://localhost:8080/api-docs`.

## API overview

| Resource | Endpoints |
|----------|-----------|
| Events   | `GET/POST /events/` · `GET/PUT/DELETE /events/:id` |
| Venues   | `GET/POST /venues/` · `GET/PUT/DELETE /venues/:id` |
| RSVPs    | `GET/POST /rsvp/` · `GET/PUT/DELETE /rsvp/:id` |
| Users    | `GET/POST /users/` · `GET/PUT/DELETE /users/:id` |
| Auth     | `GET /auth/google` · `GET /auth/status` · `GET /auth/logout` |

Write endpoints (POST/PUT/DELETE) require Google OAuth2 authentication.
