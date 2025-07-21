import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';
import { FaPlus, FaTrash } from 'react-icons/fa';
import config from '../../config.json';
import AdminNavbar from '../shared/admin_navbar';

const AdminDepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDept, setNewDept] = useState({ code: '', name: '' });

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/api/departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;
    try {
      await axios.delete(`${config.apiBaseUrl}/api/departments/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(`${config.apiBaseUrl}/api/departments`, newDept);
      setShowModal(false);
      setNewDept({ code: '', name: '' });
      fetchDepartments();
    } catch (error) {
      console.error('Add department failed:', error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <Card className="shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Department Management</h3>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                <FaPlus className="mb-1" /> Add Department
              </Button>
            </div>

            <Table striped bordered hover responsive className="text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th style={{ width: '120px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, index) => (
                  <tr key={dept.id}>
                    <td>{index + 1}</td>
                    <td>{dept.code}</td>
                    <td>{dept.name}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(dept.id)}
                      >
                        <FaTrash className="mb-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="code" className="mb-3">
              <Form.Label>Department Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. CS, MATH"
                value={newDept.code}
                onChange={(e) =>
                  setNewDept({ ...newDept, code: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Computer Science"
                value={newDept.name}
                onChange={(e) =>
                  setNewDept({ ...newDept, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Save Department
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminDepartmentPage;
