import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlus } from "react-icons/fa6";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import toast from "react-hot-toast";
import { base } from "../api";
import { useTaskContext } from "../context/task";


export const AddTask = () => {
  const {
    fetchTasks,
    show,
    setShow,
    status,
    setStatus,
    task,
    setTask,
    singleStatus,
    setSingleStatus,
    setAction,
    action,
  } = useTaskContext();
  const token = localStorage.getItem("token");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (!task.title) return toast.error("Title  missing!!");
    else {
      fetch(base + "/task", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...task, status: singleStatus }),
      })
        .then(async (res) => {
          if (res.ok) return res.json();
          else {
            const data = await res.json();
            throw new Error(data.error);
          }
        })
        .then((result) => {
          toast.success(result.message);
          fetchTasks();
          setSingleStatus("Todo");
          setTask({ title: "", body: "" });
          handleClose();
        })
        .catch((error) => {
          console.error("Error occurred:", error);
          toast.error(error.message);
        });
    }
  };

  const handleEdit = () =>
    fetch(base + `/task/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...task, status: singleStatus }),
    })
      .then(async (res) => {
        if (res.ok) return res.json();
        else {
          const data = await res.json();
          throw new Error(data.error);
        }
      })
      .then((result) => {
        toast.success(result.message);
        fetchTasks();
        handleClose();
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        toast.error(error.message);
      });

  const handleStatus = (status) => setSingleStatus(status);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        className="d-flex align-items-center gap-1 btn btn-outline-primary"
        onClick={() => {
          setTask({ title: "", body: "" });
          setSingleStatus("Todo");
          handleShow();
          setAction("add");
        }}
      >
        <FaPlus size={14} />
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
          <Modal.Title className="text-secondary">
            {action === "edit" ? (
              <span>Edit tast</span>
            ) : (
              <span> Add new task</span>
            )}
          </Modal.Title>
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
            rows={7}
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
              {singleStatus}
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
            <Button
              className="btn bg-delete text-white border-0"
              onClick={handleClose}
            >
              Cancel
            </Button>

            {action === "edit" ? (
              <Button
                className="btn bg-submit text-white border"
                onClick={handleEdit}
              >
                Edit
              </Button>
            ) : (
              <Button
                className="btn bg-submit text-white border"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
