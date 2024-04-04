import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlus } from "react-icons/fa6";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

export const AddTask = () => {
  const [show, setShow] = useState(false);
  const [status,setStatus] = useState('Todo')

  const handleStatus = (status)=> setStatus(status)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        <FaPlus size={13} />
        <span>Add Task</span>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            name="title"
            // onChange={handleInput}
            id="title"
          />

          <Form.Label htmlFor="title" className="mt-2">
            Description
          </Form.Label>
          <Form.Control as="textarea" rows={4} />
          <p className="mt-3 mb-1">Status</p>
          <Dropdown>
              <Dropdown.Toggle
                className="bg-white shadow-sm text-dark  w-100 text-start"
                id="dropdown-basic"
              >
                {status}
              </Dropdown.Toggle>
              <Dropdown.Menu className="border-0 shadow w-100">
                <Dropdown.Item onClick={()=>handleStatus('In Progress')}>In Progress</Dropdown.Item>
                <Dropdown.Item onClick={()=>handleStatus('Todo')}>Todo</Dropdown.Item>
                <Dropdown.Item onClick={()=>handleStatus('In Review')}>In Review</Dropdown.Item>
                <Dropdown.Item onClick={()=>handleStatus('Completed')}>Completed</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          <div className="d-flex gap-3 justify-content-end mt-4">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
