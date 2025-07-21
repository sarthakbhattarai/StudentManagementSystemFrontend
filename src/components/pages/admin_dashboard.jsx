import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Button } from 'react-bootstrap';
import config from '../../config.json';
import { FaUserGraduate, FaChalkboardTeacher, FaUniversity, FaUsersCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import AdminNavbar from '../shared/admin_navbar';

const COLORS = ['#28a745', '#17a2b8', '#dc3545'];

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    departments: 0,
    programs: 0,
  });
  const [recentStudents, setRecentStudents] = useState([]);
  const [studentStatusData, setStudentStatusData] = useState([]);

  const navigate = useNavigate();

  const fetchDashboardStats = async () => {
    try {
      const [studentRes, teacherRes, deptRes, progRes] = await Promise.all([
        axios.get(`${config.apiBaseUrl}/api/students/students`),
        axios.get(`${config.apiBaseUrl}/api/users/allteachers`),
        axios.get(`${config.apiBaseUrl}/api/departments`),
        axios.get(`${config.apiBaseUrl}/api/programs`),
      ]);

      setStats({
        students: studentRes.data.length,
        teachers: teacherRes.data.length,
        departments: deptRes.data.length,
        programs: progRes.data.length,
      });

      setRecentStudents(studentRes.data.slice(-5).reverse());

      const statusCounts = studentRes.data.reduce((acc, student) => {
        acc[student.status] = (acc[student.status] || 0) + 1;
        return acc;
      }, {});

      const formattedData = Object.entries(statusCounts).map(([key, value]) => ({
        name: key,
        value,
      }));

      setStudentStatusData(formattedData);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h2 className="mb-4">Admin Dashboard</h2>

        <Row className="g-4 mb-4">
          <Col md={3}>
            <Card className="text-center shadow">
              <Card.Body>
                <FaUserGraduate size={40} className="text-primary mb-2" />
                <Card.Title>{stats.students}</Card.Title>
                <Card.Text>Total Students</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow">
              <Card.Body>
                <FaChalkboardTeacher size={40} className="text-success mb-2" />
                <Card.Title>{stats.teachers}</Card.Title>
                <Card.Text>Total Teachers</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow">
              <Card.Body>
                <FaUniversity size={40} className="text-warning mb-2" />
                <Card.Title>{stats.departments}</Card.Title>
                <Card.Text>Total Departments</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow">
              <Card.Body>
                <FaUsersCog size={40} className="text-danger mb-2" />
                <Card.Title>{stats.programs}</Card.Title>
                <Card.Text>Total Programs</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header>Recent Student Registrations</Card.Header>
              <Card.Body>
                {recentStudents.length === 0 ? (
                  <p className="text-muted">No recent registrations.</p>
                ) : (
                  <ul className="list-group">
                    {recentStudents.map((student) => (
                      <li
                        className="list-group-item d-flex justify-content-between"
                        key={student.studentId}
                      >
                        <span>{student.username}</span>
                        <span className="text-muted">{student.enrollmentYear}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header>Student Status Overview</Card.Header>
              <Card.Body className="d-flex justify-content-center">
                <PieChart width={300} height={300}>
                  <Pie
                    data={studentStatusData}
                    cx={150}
                    cy={150}
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {studentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h5 className="mb-3">Quick Links</h5>
        <Row className="g-3">
          <Col md={3}>
            <Button variant="outline-primary" className="w-100" onClick={() => navigate('/admin/students')}>
              Manage Students
            </Button>
          </Col>
          <Col md={3}>
            <Button variant="outline-success" className="w-100" onClick={() => navigate('/admin/teachers')}>
              Manage Teachers
            </Button>
          </Col>
          <Col md={3}>
            <Button variant="outline-warning" className="w-100" onClick={() => navigate('/admin/departments')}>
              Manage Departments
            </Button>
          </Col>
          <Col md={3}>
            <Button variant="outline-danger" className="w-100" onClick={() => navigate('/admin/programs')}>
              Manage Programs
            </Button>
          </Col>
          
        </Row>
        <br></br>
        <br></br>
        <br></br>
        
      </div>
    </>
  );
};

export default AdminDashboardPage;
