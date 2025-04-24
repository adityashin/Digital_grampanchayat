import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { FaHome, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Styles.css";
function AdminNavbar() {
    const navigate = useNavigate(); 
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
      };

      const [username, setUsername] = useState("");

      useEffect(() => {
        // Fetch username from session storage when the component mounts
        const storedUsername = sessionStorage.getItem("userName");
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }, []);
      

  return (
    <div>
      <Navbar variant="dark" expand="lg" className="px-5" style={{ border: '2px solid white',backgroundColor:"#9a4e17" }}>
        <Container fluid>
        <Navbar.Brand as={NavLink} to="/admin/addagent" className="d-flex align-items-center text-decoration-none">
        <span className="logo-style">
          Digital Grampanchayat
        </span>
      </Navbar.Brand>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex justify-content-between w-100">
              <Nav.Item>
                <NavLink
                  to="/admin"
                  className="nav-link fs-4 text-white fw-semibold"
                >
                 
                </NavLink>
              </Nav.Item>
              <Nav.Item className="d-flex align-items-center">
                <Badge bg="light" className="fs-5 text-dark fw-semibold">
                <FaUserCircle /> {username}
                </Badge>
                <Button
                  variant="danger"
                  className="ms-3"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Logout
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </div>
  )
}

export default AdminNavbar
