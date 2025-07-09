import React, { useState } from 'react';
import TopNavbar from './Navbar';


const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const bg = darkMode ? '#1e1e1e' : '#f5f5f5';
  const text = darkMode ? '#ffffff' : '#000000';

  return (
    <div style={{ backgroundColor: bg, color: text, minHeight: '100vh' }}>
      <TopNavbar darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />
      <div className="container py-5">
        <h2 className="mb-4">Welcome to the Dashboard</h2>
        <div
          className="p-4 rounded"
          style={{ backgroundColor: darkMode ? '#2c2c2c' : '#ffffff' }}
        >
          <p>This is your main dashboard content area.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
