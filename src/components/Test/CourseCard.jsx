import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CourseCard = ({ title }) => (
  <Card className="p-3 shadow-sm" style={{ borderRadius: '15px' }}>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Button variant="primary" className="mt-2">View</Button>
    </Card.Body>
  </Card>
);

export default CourseCard;
