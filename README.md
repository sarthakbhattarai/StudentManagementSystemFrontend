Student Management System Frontend

A React-based frontend for the Student Management System, built with React, React Router, Axios, and Bootstrap.

Table of Contents

Features

Prerequisites

Getting Started

Project Structure

Available Scripts

Contributing

License

Features

Authentication & Authorization: JWT-based login/logout flows with role-based access (Admin, Teacher, Student).

Routing: Client-side routing with React Router v6.

API Integration: Centralized HTTP client using Axios for CRUD operations (Students, Courses, Enrollments, Attendance, Grades, Finance).

UI Components: Responsive design with React-Bootstrap components (Tables, Forms, Navbars).

State Management: Global auth state via React Context.

Notifications: Toasts for success/error feedback using react-toastify.

Form Handling: Robust form management with react-hook-form.

Prerequisites

Node.js (v14 or higher)

npm (v6 or higher)

Getting Started

Clone the repository

git clone https://github.com/your-org/student-mgmt-frontend.git
cd student-mgmt-frontend

Install dependencies

npm install

Configure environment

Copy .env.example to .env and update API base URL, JWT settings, etc.

Run the app

npm start

The app will be available at http://localhost:3000.

Project Structure

student-mgmt-frontend/
├── public/                 # Static assets and index.html
├── src/
│   ├── api/                # Axios instance and service modules
│   ├── auth/               # AuthContext and hooks
│   ├── components/         # Reusable UI components
│   ├── features/           # Domain feature logic (students, courses, etc.)
│   ├── layouts/            # Dashboard layout, Navbar, Sidebar
│   ├── pages/              # Route targets (Login, Dashboard, Reports)
│   ├── routes/             # React Router configuration
│   ├── styles/             # Global CSS/Sass (Bootstrap customization)
│   └── index.js            # App entry point
├── .env.example            # Sample environment variables
├── package.json
└── README.md               # This file

Available Scripts

In the project directory, you can run:

npm startStarts the development server.

npm run buildBundles the app for production to the build folder.

npm testLaunches the test runner.

npm run lintRuns ESLint to catch code issues.

Contributing

Contributions are welcome! Please open issues and pull requests with descriptive titles and clear descriptions of changes.

License

This project is licensed under the MIT License. See the LICENSE file for details.

