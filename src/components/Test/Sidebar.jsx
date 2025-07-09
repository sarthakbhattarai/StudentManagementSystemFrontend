import React from 'react';
import { Nav } from 'react-bootstrap';
import {
  FaHome, FaMoneyCheckAlt, FaBook, FaChartBar, FaSignOutAlt, FaGraduationCap,
} from 'react-icons/fa';

const Sidebar = ({ darkMode }) => {
  const bg = darkMode ? '#121212' : '#ffffff';
  const color = darkMode ? '#ffffff' : '#000000';

  return (
    <div
      style={{
        width: '250px',
        backgroundColor: bg,
        color: color,
        minHeight: '100vh',
        padding: '30px 15px',
        borderRight: `1px solid ${darkMode ? '#333' : '#ddd'}`,
        position: 'fixed',
        left: 0,
        top: 0,
      }}
    >
      {/* Logo */}
      <div className="text-center mb-5">
        <FaGraduationCap size={40} />
        <h5 className="mt-2 fw-bold">Student Portal</h5>
      </div>

      {/* Nav Links */}
      <Nav className="flex-column">
        <Nav.Link href="#" className="my-2" style={{ color }}>
          <FaHome className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link href="#" className="my-2" style={{ color }}>
          <FaMoneyCheckAlt className="me-2" /> Payment Info
        </Nav.Link>
        <Nav.Link href="#" className="my-2" style={{ color }}>
          <FaBook className="me-2" /> Courses
        </Nav.Link>
        <Nav.Link href="#" className="my-2" style={{ color }}>
          <FaChartBar className="me-2" /> Results
        </Nav.Link>
        <Nav.Link href="#" className="my-2" style={{ color }}>
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
