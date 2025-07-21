import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, Button, Modal, Form, Row, Col, Alert,
} from 'react-bootstrap';
import config from "../../config.json";
import AdminNavbar from '../shared/admin_navbar';

const AdminProgramPage = () => {
  const [programs, setPrograms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    degreeLevel: '',
    totalCreditsRequired: '',
    departmentId: '',
  });
  const [error, setError] = useState('');

  const degreeLevels = ['DIPLOMA', 'BACHELORS', 'MASTERS', 'DOCTORATE'];

  const fetchPrograms = async () => {
    try {
      const res = await axios.get(`${config.apiBaseUrl}/api/programs`);
      setPrograms(res.data);
    } catch (err) {
      console.error('Failed to load programs', err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${config.apiBaseUrl}/api/departments`);
      setDepartments(res.data);
    } catch (err) {
      console.error('Failed to load departments', err);
    }
  };

  useEffect(() => {
    fetchPrograms();
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await axios.delete(`${config.apiBaseUrl}/api/programs/${id}`);
        fetchPrograms();
      } catch (err) {
        console.error('Delete failed', err);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.degreeLevel || !form.totalCreditsRequired || !form.departmentId) {
      setError('All fields are required.');
      return;
    }
    try {
      await axios.post(`${config.apiBaseUrl}/api/programs`, {
        ...form,
        totalCreditsRequired: parseInt(form.totalCreditsRequired, 10),
      });
      setForm({ name: '', degreeLevel: '', totalCreditsRequired: '', departmentId: '' });
      setShowModal(false);
      setError('');
      fetchPrograms();
    } catch (err) {
      console.error('Program creation failed', err);
      setError('Failed to create program.');
    }
  };

  return (
    <>
    <AdminNavbar/>
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Program List</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Add Program
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Degree Level</th>
            <th>Credits</th>
            <th>Department</th>
            <th style={{ width: '100px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.name}</td>
              <td>{p.degreeLevel}</td>
              <td>{p.totalCreditsRequired}</td>
              <td>{p.departmentName}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Program Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Program</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Program Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="e.g. BSc Computer Science"
                value={form.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Degree Level</Form.Label>
                  <Form.Select
                    name="degreeLevel"
                    value={form.degreeLevel}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Select --</option>
                    {degreeLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Total Credits</Form.Label>
                  <Form.Control
                    type="number"
                    name="totalCreditsRequired"
                    placeholder="e.g. 120"
                    value={form.totalCreditsRequired}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                name="departmentId"
                value={form.departmentId}
                onChange={handleInputChange}
              >
                <option value="">-- Select Department --</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} ({dept.code})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleSubmit}>Save Program</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default AdminProgramPage;
