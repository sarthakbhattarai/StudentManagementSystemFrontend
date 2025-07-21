import React from 'react';
import { Card, Image } from 'react-bootstrap';

const DashboardHeader = ({ userName, avatar }) => (
  <Card className="p-4 text-white" style={{ backgroundColor: '#7b47f1', borderRadius: '15px' }}>
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h4>Welcome back, {userName}!</h4>
        <p>Always stay updated in your student portal</p>
      </div>
      <Image src={avatar} roundedCircle width="70" />
    </div>
  </Card>
);

export default DashboardHeader;
