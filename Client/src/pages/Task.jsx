import Dropdown from "react-bootstrap/Dropdown";
import { CiFilter } from "react-icons/ci";
import { Header } from "../components/Navbar";
import { AddTask } from "../components/Modal";

import { GoSortAsc } from "react-icons/go";
import { GoSortDesc } from "react-icons/go";
import { Table } from "../components/Table";
import { useTaskContext } from "../context/task";
import { useEffect } from "react";
import Loader from "../components/Loader";

export default function Task() {
  const { sortBy, setSortBy, status, setStatus, fetchTasks, loading } =
    useTaskContext();

  useEffect(() => fetchTasks(), []);

  const handleStatus = (status) => setStatus(status);
  const handleSort = (sort) => setSortBy(sort);

  
  return (
    <div className="">
      <Header />
      <div className="container  mt-4 px-5 py-2 rounded">
        <div className="d-flex justify-content-between my-3">
          <div className="d-flex align-items-center gap-4">
            <Dropdown>
              <Dropdown.Toggle
                className="bg-white shadow-sm text-dark"
                id="dropdown-basic"
              >
                {sortBy === "Descending" || sortBy === "" ? (
                  <GoSortDesc />
                ) : (
                  <GoSortAsc />
                )}
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
                <Dropdown.Item onClick={() => handleStatus("All")}>
                  All
                </Dropdown.Item>
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
          <AddTask />
        </div>
        {loading ? <div className="text-center"><Loader/> </div> : <Table />}
      </div>
    </div>
  );
}
