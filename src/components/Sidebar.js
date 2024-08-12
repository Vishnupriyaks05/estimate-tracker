import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ visible, onClose }) => {
  return (
    <div className={`sidebar ${visible ? 'active' : ''}`}>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/save" onClick={onClose}>Estimate Form</Nav.Link>
        <Nav.Link as={Link} to="/search" onClick={onClose}>Estimate Search</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;