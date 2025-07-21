import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import {
  FaHome,
  FaUsersCog,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUniversity,
  FaSignOutAlt,
  FaGraduationCap,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = ({ darkMode, toggleTheme }) => {
  const bg = darkMode ? 'dark' : 'light';
  const variant = darkMode ? 'dark' : 'light';
  const textColor = darkMode ? 'text-light' : 'text-dark';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <Navbar bg={bg} variant={variant} expand="lg" className="shadow-sm py-3">
      <Container>
        {/* Brand */}
        <Navbar.Brand className={`fw-bold d-flex align-items-center ${textColor}`}>
          <FaGraduationCap className="me-2" />
          Admin Portal
        </Navbar.Brand>

        {/* Hamburger menu */}
        <Navbar.Toggle aria-controls="admin-navbar" />

        <Navbar.Collapse id="admin-navbar">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Nav.Link href="/admin/dashboard" className={textColor}>
              <FaHome className="me-1" /> Dashboard
            </Nav.Link>
            <Nav.Link href="/admin/department" className={textColor}>
              <FaUniversity className="me-1" /> Departments
            </Nav.Link>
            <Nav.Link href="/admin/teacher" className={textColor}>
              <FaChalkboardTeacher className="me-1" /> Teachers
            </Nav.Link>
            <Nav.Link href="/admin/student" className={textColor}>
              <FaUserGraduate className="me-1" /> Students
            </Nav.Link>
            <Nav.Link href="/admin/program" className={textColor}>
              <FaUsersCog className="me-1" /> Programs
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className={textColor} style={{ cursor: 'pointer' }}>
              <FaSignOutAlt className="me-1" /> Logout
            </Nav.Link>

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
