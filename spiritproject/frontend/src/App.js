import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Home from "./components/pages/Home";
import DataVolume from "./components/pages/DataVolume";
import Analysis from "./components/pages/Analysis";

function App() {
  return (
    <div className="primarycolor text-white min-vh-100">
      <Navbar expand="lg">
        <Navbar.Brand href="/">Spirit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/datavolume">
              DataVolume
            </Nav.Link>
            <Nav.Link as={Link} to="/analysis">
              Analysis
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/datavolume" element={<DataVolume />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
