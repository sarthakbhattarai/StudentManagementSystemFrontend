import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';
import { FaPlus, FaChalkboardTeacher } from 'react-icons/fa';
import config from "../../config.json";
import AdminNavbar from '../shared/admin_navbar';

const AdminTeacherPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    username: '',
    email: '',
    password: '',
    departmentId: '',
    hireDate: ''
  });

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/api/users/allteachers`);
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/api/departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchDepartments();
  }, []);

  const handleAdd = async () => {
    try {
      await axios.post(`${config.apiBaseUrl}/api/users/register/teacher`, newTeacher);
      setShowModal(false);
      setNewTeacher({
        username: '',
        email: '',
        password: '',
        departmentId: '',
        hireDate: ''
      });
      fetchTeachers();
    } catch (error) {
      console.error('Add teacher failed:', error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <Card className="shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="d-flex align-items-center gap-2">
                <FaChalkboardTeacher /> Teacher Management
              </h3>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                <FaPlus /> Add Teacher
              </Button>
            </div>

            <Table striped bordered hover responsive className="text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Hire Date</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={teacher.teacherId}>
                    <td>{index + 1}</td>
                    <td>{teacher.username}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.departmentName}</td>
                    <td>{teacher.hireDate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTeacher.username}
                    onChange={(e) => setNewTeacher({ ...newTeacher, username: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newTeacher.password}
                    onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    value={newTeacher.departmentId}
                    onChange={(e) => setNewTeacher({ ...newTeacher, departmentId: e.target.value })}
                  >
                    <option value="">-- Select Department --</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Hire Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={newTeacher.hireDate}
                    onChange={(e) => setNewTeacher({ ...newTeacher, hireDate: e.target.value })}
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Save Teacher
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminTeacherPage;
