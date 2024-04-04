import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlus } from "react-icons/fa6";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import toast from 'react-hot-toast'
import { base } from "../api";

export const AddTask = () => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("Todo");
  const [task, setTask] = useState({
    title: "",
    body: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target
    setTask((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = ()=> {
     if(!task.title)
     return toast.error('Title is missing!!')
    else {
      fetch(base+'/task',{
        method:'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify({...task,status})
      })
      .then(res=>  console.log(res.json()))
      
    }
  }


  const handleStatus = (status) => setStatus(status);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className="btn d-flex align-items-center gap-1 text-white bg-submit border-0"
        onClick={handleShow}
      >
        <FaPlus size={14} />
        <span>Add Task</span>
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-secondary">Add new task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-secondary p-5">
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            name="title"
            value={task.title}
            onChange={handleChange}
            id="title"
          />

          <Form.Label htmlFor="body" className="mt-2">
            Description
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            id="body"
            name="body"
            value={task.body}
            onChange={handleChange}
          />
          <p className="mt-3 mb-1">Status</p>
          <Dropdown>
            <Dropdown.Toggle
              className="bg-white shadow-sm text-dark  w-100 text-start"
              id="dropdown-basic"
            >
              {status}
            </Dropdown.Toggle>
            <Dropdown.Menu className="border-0 shadow w-100">
              <Dropdown.Item onClick={() => handleStatus("In Progress")}>
                In Progress
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatus("Todo")}>
                Todo
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatus("In Review")}>
                In Review
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatus("Completed")}>
                Completed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="d-flex gap-3 justify-content-end mt-4">
            <Button className="btn bg-delete text-white border-0">
              Cancel
            </Button>
            <Button className="btn bg-submit text-white border" onClick={handleSubmit}>Submit</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
