import { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Pagination from "react-bootstrap/Pagination";
import { useTaskContext } from "../context/task";
import { base } from "../api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const Table = () => {
  const { task, fetchTasks } = useTaskContext();

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

  return (
    <div className="table-responsive shadow-sm p-3 bg-white rounded-3 mt-2">
      <table className="table table-hover table-borderless">
        <thead className="text-secondary">
          <tr>
            <th className="align-middle text-secondary">Date</th>
            <th className="align-middle text-secondary">Task</th>
            <th className="align-middle text-secondary">Status</th>
            <th className="align-middle text-secondary">Action</th>
          </tr>
        </thead>
        <tbody>
          {task?.map((data, index) => (
            <tr key={index}>
              <td className="align-middle text-secondary">
                {new Date(data.createdAt).toISOString().split("T")[0]}
              </td>
              <td
                title="View details"
                className="py-3 align-middle text-secondary cursor-pointer align-middle"
              >
                {data.title}
              </td>

              <td className="align-middle text-secondary">{data.status}</td>
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
      <nav aria-label="Page navigation example" className="mt-5">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
