import { useEffect, useState } from "react";
import { RiDeleteBin6Fill, RiEdit2Line } from "react-icons/ri";
import Pagination from "react-bootstrap/Pagination";
import { useTaskContext } from "../context/task";
import { base } from "../api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/auth";

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
    return div;
  };

  const handleLimit = (event) => {
    const { value } = event.target;
    setLimit(value);
  };

  return (
    <div className="table-responsive  p-3 bg-white rounded-3 mt-2 text-nowrap">
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
                {new Date(data.createdAt).toISOString().split("T")[0]}
              </td>
              <td
                title="View details"
                className="py-3 align-middle text-secondary  align-middle"
              >
                <div
                  className="d-inline-block cursor-pointer border rounded-4 p-3 position-relative"
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
                  <div className="row ">
                    <p className="fw-bold col-8">{data.title}</p>
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
                    {data.body.length > 40
                      ? `${data.body.slice(0, 40)}...`
                      : data.body}
                  </span>
                </div>
              </td>
              <td className="align-middle text-secondary">{data.user.email}</td>
              <td className="align-middle">
                <span
                  className={`badge ${data.status === "Todo" ? "bg-info" : data.status ==="In Progress"?'bg-warning': data.status==="In Review"?'bg-danger':'bg-primary'}`}
                >
                  {data.status}
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
      <div className="mt-5 d-flex justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <p className="m-0">Items per page</p>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleLimit}
          >
            <option selected value={10}>
              10
            </option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          {`${taskList.length}/${totalTasks}`}
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">{genereatePagesItems()}</ul>
        </nav>
      </div>
    </div>
  );
};
