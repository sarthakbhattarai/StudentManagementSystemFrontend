import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import config from "../../config.json";
import AdminNavbar from '../shared/admin_navbar';

const AdminStudentPage = () => {
  const [students, setStudents] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newStudent, setNewStudent] = useState({
    username: '',
    email: '',
    password: '',
    enrollmentYear: '',
    programId: '',
    status: 'ENROLLED'
  });

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/api/students/students`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/api/programs`);
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchPrograms();
  }, []);

  const handleAdd = async () => {
    try {
      await axios.post(`${config.apiBaseUrl}/api/students/register/student`, newStudent);
      setShowModal(false);
      setNewStudent({
        username: '',
        email: '',
        password: '',
        enrollmentYear: '',
        programId: '',
        status: 'ENROLLED'
      });
      fetchStudents();
    } catch (error) {
      console.error('Add student failed:', error);
    }
  };

  return (
    <>
    <AdminNavbar/>
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Student List</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Add Student
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th></th>
            <th>Username</th>
            <th>Email</th>
            <th>Program</th>
            <th>Enrollment Year</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.studentId}>
              <td>{index + 1}</td>
              <td>{student.username}</td>
              <td>{student.email}</td>
              <td>{student.programName}</td>
              <td>{student.enrollmentYear}</td>
              <td>{student.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={newStudent.username}
                onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newStudent.password}
                onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Enrollment Year</Form.Label>
              <Form.Control
                type="number"
                value={newStudent.enrollmentYear}
                onChange={(e) => setNewStudent({ ...newStudent, enrollmentYear: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Program</Form.Label>
              <Form.Select
                value={newStudent.programId}
                onChange={(e) => setNewStudent({ ...newStudent, programId: e.target.value })}
              >
                <option value="">-- Select Program --</option>
                {programs.map((prog) => (
                  <option key={prog.id} value={prog.id}>{prog.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newStudent.status}
                onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}
              >
                <option value="ENROLLED">ENROLLED</option>
                <option value="DROPPED">DROPPED</option>
                <option value="COMPLETED">COMPLETED</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Save Student
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default AdminStudentPage;
