import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from './components/Test/LoginPage';
import RegisterPage from './components/Test/RegisterPage';
import Dashboard from './components/Test/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDepartmentPage from './components/pages/admin_dept_page';
import AdminProgramPage from './components/pages/admin_program_page';
import AdminTeacherPage from './components/pages/admin_teacher_page';
import AdminStudentPage from './components/pages/admin_student_page';
import AdminDashboardPage from './components/pages/admin_dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/admin/department"    element={<AdminDepartmentPage />} />
        <Route path="/admin/dashboard"    element={<AdminDashboardPage />} />
        <Route path="/admin/program"    element={<AdminProgramPage />} />
        <Route path="/admin/teacher"    element={<AdminTeacherPage />} />
        <Route path="/admin/student"    element={<AdminStudentPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
