# User Management System

A comprehensive backend service for user management with authentication, built with Node.js, Express, MongoDB, and Docker.

## Features

- User registration with email verification
- OTP-based account verification
- JWT-based authentication
- Google OAuth 2.0 integration
- Token refresh mechanism
- Protected routes
- Password hashing
- Email service integration
- Docker containerization

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify` - Verify account with OTP
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback

### Users
- `GET /api/users/:id` - Get user profile (protected)
- `PUT /api/users/:id` - Update user profile (protected)

## Setup Instructions

### Prerequisites
- Docker
- Docker Compose


## 🚀 Method 1: Using Docker (Recommended)

### 🧩 Step 1: Clone the Repository
```bash
git clone (https://github.com/Aleazer1997/user-mgmt)
cd user-management-system
```

---

### ⚙️ Step 2: Setup Environment Variables
Copy the example environment file and update your credentials:
```bash
cp .env.example .env
```

Now open `.env` and edit the values as needed (e.g., database, API keys, etc.).

---

### 🐳 Step 3: Build & Start the Containers
```bash
docker-compose up --build
```

This command will build the Docker images and start all services defined in `docker-compose.yml`.

---

### 🌐 Step 4: Access the Application
After the containers are running, open your browser and go to:

👉 [http://localhost:3000](http://localhost:3000)

Your API should now be up and running!


## ⚙️ Method 2: Manual Setup

### 🧩 Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd user-management-system
```

---

### 📦 Step 2: Install Dependencies
```bash
npm install
```

---

### ⚙️ Step 3: Setup Environment Variables
Copy the example environment file and update your credentials:
```bash
cp .env.example .env
```
Then open `.env` and fill in your configuration values (e.g., MongoDB URI, API keys, etc.).

---

### 🗄️ Step 4: Start MongoDB Service
Ensure MongoDB is installed and running on your system.  
Refer to your local setup guide or MongoDB documentation if needed.

---

### 🚀 Step 5: Start the Application
```bash
npm run dev
```

---

### 🌐 Step 6: Access the API
Once the application starts, open your browser and go to:

👉 [http://localhost:3000](http://localhost:3000)

Your API should now be running locally!
