import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { Form, Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { CiFilter } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { Header } from "../components/Navbar";
import { AddTask } from "../components/Modal";

import { GoSortAsc } from "react-icons/go";
import { GoSortDesc } from "react-icons/go";
import { Table } from "../components/Table";



export default function Task() {


  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleStatus = (status) => setStatus(status);
  const handleSort = (sort) => setSortBy(sort);

  const navigate = useNavigate();

  return (
    <div className="container">
      <Header />
      <div className="d-flex justify-content-between mt-3">
        <AddTask />
        <div className="d-flex align-items-center gap-4">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Dropdown>
            <Dropdown.Toggle
              className="bg-white shadow-sm text-dark"
              id="dropdown-basic"
            >
              {sortBy === "Descending" || sortBy === "" ? (
                <GoSortDesc />
              ) : (
                <GoSortAsc />
              )}{" "}
              {sortBy === "" ? "Descending" : sortBy}
            </Dropdown.Toggle>
            <Dropdown.Menu className="border-0 shadow">
              <Dropdown.Item onClick={() => handleSort("Ascending")}>
                Ascending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("Descending")}>
                Descending
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle
              className="bg-white shadow-sm text-dark"
              id="dropdown-basic"
            >
              <CiFilter /> {status === "" ? "All" : status}
            </Dropdown.Toggle>
            <Dropdown.Menu className="border-0 shadow">
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
        </div>
      </div>
    <Table></Table>
    </div>
  );
}