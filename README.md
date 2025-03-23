
# Elimu Tuts E-Learning Platform

## Overview

Elimu Tuts is a Kenyan e-learning platform designed to provide accessible, high-quality, CBC-aligned educational content to students, tutors, parents, and schools. The platform integrates multimedia learning, real-time interaction, progress tracking, and local payment solutions (M-Pesa).

## Features

Core Educational Features;

- CBC-Aligned Subjects: Mathematics, English, Kiswahili, Science, ICT, etc.

- Interactive Video Lessons with progress tracking.

- Quizzes & Assessments for self-evaluation.

- Progress Tracking & Analytics.

- Downloadable Study Materials.


 User Experience Features

- Role-Based Dashboards for students, tutors, and parents.

- Personalized Learning Paths based on performance.

- Mobile-Responsive Design optimized for different devices.

- Offline Access for low-connectivity users.

- Advanced Search Functionality.


Social & Interactive Features;

- Live Chat Support.

- Discussion Forums.

- Notifications & Alerts.

- Online Presence Tracking.

- Tutor & Course Rating System.


Payment & Monetization;

- M-Pesa Integration for secure payments.

- Subscription Plans & One-Time Course Payments.

- Tutor Earnings System for monetizing content.

- Payment History & Transaction Tracking.


## Technology Stack

### Frontend (React.js)

- **React.js** with React Router for navigation.

- Firebase Authentication for secure user logins.

- **Socket.io** Client for real-time updates.

- **Axios** for API requests.

- **M-Pesa** Checkout Integration.

- Recharts for progress analytics.

- Tailwind CSS / Bootstrap for UI styling.



Backend (Node.js, Express, MongoDB)

Express.js for REST API.

MongoDB (Mongoose ODM) for database storage.

Firebase Admin SDK for authentication management.

Socket.io Server for real-time messaging.

Multer & Cloudinary for file uploads.

M-Pesa API for mobile payments.



Installation & Setup

Prerequisites

Ensure you have the following installed:

Node.js (v16+)

MongoDB (local or MongoDB Atlas)

Firebase Account (for authentication)

Ngrok (for testing M-Pesa webhooks)


1. Clone the Repository

git clone https://github.com/your-username/elimu-tuts.git
cd elimu-tuts

2. Backend Setup

=======
### Backend (Node.js, Express, MongoDB)

- **Express.js** for REST API.

- **MongoDB** (Mongoose ODM) for database storage.

- Firebase Admin SDK for authentication management.

- **Socket.io**: Server for real-time messaging.

- Multer & Cloudinary for file uploads.

- **M-Pesa**: API for mobile payments.



## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+)

- **MongoDB** (local or MongoDB Atlas)

- **Firebase Account** (for authentication)

- **Ngrok** (for testing M-Pesa webhooks)



Project Structure

Frontend (elimu-tuts-client/)



public/: Static files such as index.html, assets, and fonts.

src/: Contains the React components, pages, and utilities.

components/: Reusable UI components.

pages/: Different application pages.

context/: Context API for state management.

hooks/: Custom React hooks.

firebase/: Firebase authentication setup.

socket/: Real-time communication with Socket.io.

utils/: Helper functions.


Backend (elimu-tuts-server/)

config/: Configuration files for the database, Firebase, etc.

controllers/: Business logic for handling requests.

middleware/: Authentication and request validation.

models/: Database schemas and models.

routes/: API route handlers.

socket/: WebSocket logic.

utils/: Utility functions.


Deployment

Frontend Deployment

## Deployment

### Frontend Deployment

Deploy the React app on Vercel or Netlify.

Update API URLs in .env or config.js.



Backend Deployment

### Backend Deployment


Deploy the backend on Render, Heroku, or AWS.

Connect to MongoDB Atlas for cloud database storage.

API Endpoints

Authentication
## API Endpoints

### Authentication


POST /api/auth/register: Register a new user.

POST /api/auth/login: User login.

GET /api/auth/user: Get user profile.



Courses

### Courses


GET /api/courses: Fetch all courses.

GET /api/courses/:id: Get course details.

POST /api/courses: Create a new course.



Payments

### Payments


POST /api/payments/mpesa: Process M-Pesa payment.

GET /api/payments/history: Get payment history.




Implementation Roadmap

Phase 1: Landing Page & Authentication
## Implementation Roadmap

### Phase 1: Landing Page & Authentication


✅ Setup project structure.

✅ Implement landing page UI.

✅ Integrate Firebase authentication.

✅ Configure MongoDB & API structure.



Phase 2: Core Dashboard & Course System

### Phase 2: Core Dashboard & Course System


✅ Develop student, tutor, and parent dashboards.

✅ Implement course listing and details.

✅ Enable file upload for learning materials.



Phase 3: Educational Features & Real-Time Chat

### Phase 3: Educational Features & Real-Time Chat


✅ Add quiz system with instant feedback.

✅ Implement progress tracking and analytics.

✅ Setup real-time messaging & notifications.



Phase 4: M-Pesa Integration & Deployment

### Phase 4: M-Pesa Integration & Deployment


✅ Configure M-Pesa API for payments.

✅ Deploy frontend on Vercel/Netlify.

✅ Deploy backend on Render/Heroku.

✅ Final testing & documentation.



Contributors

## Contributors


ODUOR Rooney - Full-Stack Developer, System Analyst


