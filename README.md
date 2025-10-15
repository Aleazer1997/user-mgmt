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


cp .env.example .env

Method 1: Using Docker (Recommended)
# Clone the repository
git clone <your-repository-url>
cd user-management-system

# Copy environment file
Copy the `.env.example` file to `.env` and update the values:

# Edit environment variables
# Update .env file with your credentials (see below)

# Build and start containers
docker-compose up --build

# The API will be available at http://localhost:3000

Method 2: Manual Setup
# Clone the repository
git clone <your-repository-url>
cd user-management-system

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit environment variables
# Update .env file with your credentials

# Start MongoDB service (see MongoDB setup below)

# Start the application
npm run dev

# The API will be available at http://localhost:3000