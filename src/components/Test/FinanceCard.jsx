import React from 'react';
import { Card } from 'react-bootstrap';

const FinanceCard = ({ label, amount, highlight = false }) => (
  <Card
    className="p-3 text-center shadow-sm"
    style={{
      borderRadius: '15px',
      backgroundColor: highlight ? '#e6e0ff' : '#fff',
    }}
  >
    <h6>{label}</h6>
    <h3 style={{ color: highlight ? '#7b47f1' : '#333' }}>{amount}</h3>
  </Card>
);

export default FinanceCard;
