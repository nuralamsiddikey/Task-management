import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";

export const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary py-3">
      <Container fluid>
        <Navbar.Brand>Task management</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link> */}
          </Nav>

    

         <Dropdown>
            <Dropdown.Toggle
              className="bg-body-tertiary border-0"
              id="dropdown-basic"
              key="start"
            >
              <Image
                width="45"
                height="45"
                src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
                className="rounded-circle object-fit-cover border border-primary"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="border-0 shadow">
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};