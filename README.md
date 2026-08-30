# sidequestgenerator
Step into an AI-powered RPG adventure! Built with Node.js and Express.js, this dynamic backend API consults the Divine Algorithm using the official @google/genai SDK 🤖.  Wanderers send a custom prompt 🏹, and the service sculpts unique, immersive sidequests on the fly ✨. 
> Note: This project was originally started under my old GitHub account.
> From this point onward, all commits are made under my current account (@rootdevansh).

## Features

- Generate AI-powered side quests from a short prompt (via Gemini)
- Full CRUD: create, read, update, and delete quests
- User authentication (register/login) with JWT
- Password hashing with bcrypt
- Ownership-based authorization — only the wanderer who created a quest can edit or delete it
- Rate limiting on quest generation to prevent abuse
- Input validation on all routes

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Gemini API for quest generation
- JWT (jsonwebtoken) for authentication
- bcrypt for password hashing
- express-rate-limit for rate limiting

## Getting Started

### Prerequisites
- Node.js installed
- A MongoDB connection string (Atlas or local)
- A Gemini API key

### Installation

1. Clone the repo
```bash
   git clone https://github.com/rootdevansh/sidequestgenerator.git
   cd sidequestgenerator
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file in the root with:
GEMINI_API_KEY=your_gemini_api_key
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_string
PORT=3000


4. Run the server
```bash
   node server.js
```

## API Routes

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/register` | Create a new wanderer account |
| POST | `/api/login` | Log in and receive a token |

### Sidequests
| Method | Route | Auth required | Description |
|--------|-------|----------------|-------------|
| POST | `/api/sidequest` | Yes | Generate a new quest from a prompt |
| GET | `/api/sidequest` | No | Get all quests |
| GET | `/api/sidequest/:id` | No | Get one quest by id |
| PUT | `/api/sidequest/:id` | Yes (owner only) | Rewrite a quest's fate |
| DELETE | `/api/sidequest/:id` | Yes (owner only) | Delete a quest |

## What I learned building this

- How JWT authentication works end-to-end (signing, verifying, protecting routes)
- The difference between authentication (401) and authorization (403)
- Why "check ownership before acting" matters for destructive operations
- Rate limiting to protect against API abuse


🔗 [Live Demo](https://sidequestgenerator-przd.onrender.com)