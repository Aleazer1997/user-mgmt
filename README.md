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

### Environment Variables
Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env