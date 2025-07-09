import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import {
  FaHome,
  FaMoneyCheckAlt,
  FaBook,
  FaChartBar,
  FaSignOutAlt,
  FaGraduationCap,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TopNavbar = ({ darkMode, toggleTheme }) => {
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
          Student Portal
        </Navbar.Brand>

        {/* Hamburger menu */}
        <Navbar.Toggle aria-controls="student-navbar" />

        <Navbar.Collapse id="student-navbar">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Nav.Link href="#" className={textColor}>
              <FaHome className="me-1" /> Dashboard
            </Nav.Link>
            <Nav.Link href="#" className={textColor}>
              <FaMoneyCheckAlt className="me-1" /> Payment
            </Nav.Link>
            <Nav.Link href="#" className={textColor}>
              <FaBook className="me-1" /> Courses
            </Nav.Link>
            <Nav.Link href="#" className={textColor}>
              <FaChartBar className="me-1" /> Results
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className={textColor} style={{ cursor: 'pointer' }}>
              <FaSignOutAlt className="me-1" /> Logout
            </Nav.Link>

            {/* Dark/Light toggle button */}
            <Button
              variant={darkMode ? 'outline-light' : 'outline-dark'}
              size="sm"
              onClick={toggleTheme}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
