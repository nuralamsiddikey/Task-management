import { useEffect, useState } from "react";
import { RiDeleteBin6Fill, RiEdit2Line } from "react-icons/ri";
import Pagination from "react-bootstrap/Pagination";
import { useTaskContext } from "../context/task";
import { base } from "../api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/auth";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";

export const Table = () => {
  const {
    taskList,
    fetchTasks,
    setShow,
    setTask,
    setSingleStatus,
    setAction,
    totalPages,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    totalTasks,
  } = useTaskContext();
  const [hoverIndex, setHoverIndex] = useState(null);
  const token = localStorage.getItem("token");

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(base + `/task/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
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
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    });
  };

  const genereatePagesItems = () => {
    const div = [];
    for (let i = 1; i <= totalPages; i++) {
      div.push(
        <li className={`page-item ${currentPage === i ? "active" : ""}`}>
          <a className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </a>
        </li>
      );
    }
    div.push(
      <li className={`page-item`}>
        <a className="page-link" onClick={handleNext}>
          <MdOutlineKeyboardArrowRight />
        </a>
      </li>
    );

    div.unshift(
      <li className={`page-item`}>
        <a className="page-link" onClick={handlePrev}>
          <MdKeyboardArrowLeft />
        </a>
      </li>
    );
    return div;
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLimit = (limit) => {
    setLimit(limit);
  };

  return (
    <div className="table-responsive  p-3 bg-white rounded-4 mt-2 text-nowrap shadow-sm">
      {taskList.length < 1 ? (
        <p className="fw-bold text-secondary text-center mt-5">
          No task found.
        </p>
      ) : (
        <table className="table table-hover table-borderless text-center">
          <thead className="text-secondary">
            <tr>
              <th className="align-middle text-secondary">Date</th>
              <th className="align-middle text-secondary">Task</th>
              <th className="align-middle text-secondary">Assigned</th>
              <th className="align-middle text-secondary">Status</th>
              <th className="align-middle text-secondary">Action</th>
            </tr>
          </thead>
          <tbody>
            {taskList?.map((data, index) => (
              <tr
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <td className="align-middle text-secondary">
                  {new Date(data?.createdAt).toISOString().split("T")[0]}
                </td>
                <td
                  title="View details"
                  className="py-3 align-middle text-secondary  align-middle text-wrap"
                >
                  <div
                    className="d-inline-block cursor-pointer border rounded-4 p-3 text-start position-relative"
                    style={{ minWidth: "300px" }}
                    onClick={() => {
                      setShow(true);
                      setTask({
                        id: data._id,
                        title: data.title,
                        body: data.body,
                      });
                      setSingleStatus(data.status);
                      setAction("edit");
                    }}
                  >
                    <div className="row">
                      <p className="fw-bold">
                        {data?.title.length > 50
                          ? `${data.title.slice(0, 50)}...`
                          : data.title}
                      </p>
                      <div className="col-4 position-absolute  top-0 end-0">
                        {hoverIndex === index && (
                          <RiEdit2Line
                            className="bg-primary rounded-circle p-2"
                            size={30}
                            color="white"
                            style={{ transition: "all 0.9s ease" }}
                          />
                        )}
                      </div>
                    </div>

                    <span>
                      {data?.body.length > 50
                        ? `${data.body.slice(0, 50)}...`
                        : data.body}
                    </span>
                  </div>
                </td>
                <td className="align-middle text-secondary">
                  {data?.user?.email}
                </td>
                <td className="align-middle">
                  <span
                    className={`badge ${
                      data.status === "Todo"
                        ? "bg-info"
                        : data.status === "In Progress"
                        ? "bg-warning"
                        : data.status === "In Review"
                        ? "bg-danger"
                        : "bg-primary"
                    }`}
                  >
                    {data?.status}
                  </span>{" "}
                </td>
                <td className="align-middle text-secondary">
                  <RiDeleteBin6Fill
                    onClick={() => handleDelete(data._id)}
                    title="delete"
                    color="red"
                    size={30}
                    className="bg-light p-2 rounded-circle cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    {taskList.length>0?  <div className="mt-5 d-sm-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3 mb-1">
          <p className="m-0">Items per page</p>

          <Dropdown>
            <Dropdown.Toggle
              className="bg-white shadow-sm text-dark"
              id="dropdown-basic"
            >
              {limit}
            </Dropdown.Toggle>
            <Dropdown.Menu className="border-0 shadow">
              <Dropdown.Item onClick={() => handleLimit(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLimit(20)}>20</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLimit(50)}>50</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLimit(100)}>
                100
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <span> {`${taskList.length}/${totalTasks}`}</span>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination user-select-none m-0">
            {genereatePagesItems()}
          </ul>
        </nav>
      </div>:''}
    </div>
  );
};
