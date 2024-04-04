import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { Form, Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { CiFilter } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { Header } from "../components/Navbar";
import { AddTask } from "../components/Modal";


const tasks = [
  {
    taskName: "A230801 ICON Cristina Meruata THM-117 Research Project",
    dateOfSubmission: "23/04/2024",
    priority: "Medium",
    status: "Ready",
  },
  {
    taskName: "A230801 ICON Cristina Meruata THM-117 Research Project",
    dateOfSubmission: "23/04/2024",
    priority: "High",
    status: "PR Done",
  },
  {
    taskName: "A230801 ICON Cristina Meruata THM-117 Research Project",
    dateOfSubmission: "23/04/2024",
    priority: "Low",
    status: "Not Started",
  },
  {
    taskName: "A230801 ICON Cristina Meruata THM-117 Research Project",
    dateOfSubmission: "23/04/2024",
    priority: "Medium",
    status: "In Progress",
  },
  {
    taskName: "A230801 ICON Cristina Meruata THM-117 Research Project",
    dateOfSubmission: "23/04/2024",
    priority: "Medium",
    status: "Delivered",
  },
  {
    taskName: "A230801 ICON Cristina Meruata THM-117 Research Project",
    dateOfSubmission: "23/04/2024",
    priority: "Medium",
    status: "Proof Reading",
  },
];

export default function Task() {
  const [task, setTask] = useState(tasks);
  const navigate = useNavigate();

  return (
    <div className="container">
      <Header />
      <div className="d-flex justify-content-between mt-3">
        <div>
          <div className="d-flex align-items-center gap-4">
            <Dropdown>
              <Dropdown.Toggle
                className="bg-white shadow-sm text-dark"
                id="dropdown-basic"
              >
                <CiFilter /> Filter
              </Dropdown.Toggle>
              <Dropdown.Menu className="border-0 shadow">
                <Dropdown.Item href="#/action-1">Ready</Dropdown.Item>
                <Dropdown.Item href="#/action-2">PR Done</Dropdown.Item>
                <Dropdown.Item href="#/action-3">In Progress</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Delivered</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Not Started</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Proof Reading</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </div>
        </div>
        <AddTask/>
      
      </div>
      <div className="table-responsive shadow-sm p-3 bg-white rounded-3 mt-2">
        <table className="table table-hover table-borderless text-center">
          <thead>
            <tr>
              <th className="text-primary align-middle">Sl.No</th>
              <th className="text-primary align-middle">Task</th>
              <th className="text-primary align-middle">Status</th>
              <th className="text-primary align-middle">Action</th>
            </tr>
          </thead>
          <tbody>
            {task.map((data, index) => (
              <tr key={index}>
                <td className="text-secondary align-middle">{index + 1}</td>
                <td
                  className="py-3 align-middle text-secondary cursor-pointer align-middle"
                  onClick={() => navigate("/task/details/1")}
                >
                  {data.taskName}
                </td>

                <td className="align-middle text-secondary">{data.status}</td>
                <td className="align-middle text-secondary">
                  <button>edit</button>
                  <button>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
