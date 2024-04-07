import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { base } from "../api";

export const Header = () => {
  const navigate = useNavigate();
  const fullName = localStorage.getItem("fullName");
  const image = localStorage.getItem("image");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    localStorage.removeItem("image");
    navigate("/signin");
  };

  return (
    <Navbar expand="lg" className="bg-white p-3 shadow-sm">
      <div className="container">
        <Navbar.Brand>Techzu</Navbar.Brand>
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
          <span className="text-secondary">{fullName}</span>
          <Dropdown>
            <Dropdown.Toggle
              className="bg-body-tertiary border-0"
              id="dropdown-basic"
              title="logout"
            >
              <Image
                width="45"
                height="45"
                src={`${base}/${image}`}
                className="rounded-circle object-fit-cover border border-primary"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="border-0 shadow">
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};
