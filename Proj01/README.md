# Proj01 - Fullstack Node.js, Express & MongoDB Atlas App

A production-grade fullstack web application featuring user Authentication (Signup, Login) and a Protected User Profile page built with Node.js, Express, MongoDB Atlas, JWT, and vanilla HTML5/CSS3/JavaScript.

## Project Architecture

```
Proj01/
├── backend/                  # REST API Express Server
│   ├── .env                  # Environment Variables (Port, DB, Secrets)
│   ├── .env.example          # Sample Environment Template
│   ├── .gitignore            # Git Ignore Rules
│   ├── package.json          # Node Dependencies & Scripts
│   ├── server.js             # Server Entry Point
│   └── src/
│       ├── app.js            # Express App setup & Middlewares
│       ├── config/
│       │   └── db.js         # MongoDB Atlas Mongoose connection
│       ├── controllers/
│       │   ├── authController.js   # Register, Login, Logout handlers
│       │   └── userController.js   # Get Profile & Update Profile handlers
│       ├── middlewares/
│       │   ├── authMiddleware.js   # Protect routes via JWT
│       │   └── errorMiddleware.js  # Global error & 404 handler
│       ├── models/
│       │   └── User.js       # User Schema with Bcrypt Password Hash
│       ├── routes/
│       │   ├── authRoutes.js # /api/auth routes
│       │   └── userRoutes.js # /api/user routes
│       └── utils/
│           └── generateToken.js    # JWT Generator & Cookie setter
└── frontend/                 # Client UI
    ├── css/
    │   └── styles.css        # Glassmorphism Design System & CSS Variables
    ├── js/
    │   ├── api.js            # API Fetch Client with Auth Header & Cookies
    │   ├── auth.js           # Login & Signup Form Controller
    │   ├── profile.js        # Profile Dashboard Controller & Edit Modal
    │   └── ui.js             # Toast Notifications & UI Utilities
    ├── index.html            # Landing / Welcome Page
    ├── login.html            # Sign In Page
    ├── signup.html           # Registration Page
    └── profile.html          # Protected User Profile Dashboard
```

## Quick Start Guide

### 1. Setup Backend
1. Navigate to backend directory:
   ```bash
   cd Proj01/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `.env` with your MongoDB Atlas Connection String:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000`.

### 2. Setup Frontend
You can serve the `frontend` folder using any static server or open `frontend/index.html` directly in your browser.
Since Express in the backend is configured with static file middleware, navigating to `http://localhost:5000` will automatically serve the fullstack application!

## API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login with email & password |
| `POST` | `/api/auth/logout` | Public | Clear authentication cookie |
| `GET` | `/api/user/profile` | Protected | Fetch current user profile |
| `PUT` | `/api/user/profile` | Protected | Update user profile details / password |
| `GET` | `/api/health` | Public | Server health check |
