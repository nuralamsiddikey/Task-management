import { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Pagination from "react-bootstrap/Pagination";
import { useTaskContext } from "../context/task";


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

export const Table = () => {
 // const [task, setTask] = useState(tasks);
  const {task} = useTaskContext()

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
              <td className="align-middle text-secondary">{new Date(data.createdAt).toISOString().split('T')[0]}</td>
              <td
                title="View details"
                className="py-3 align-middle text-secondary cursor-pointer align-middle"
              >
                {data.title}
              </td>

              <td className="align-middle text-secondary">{data.status}</td>
              <td className="align-middle text-secondary">
                <button className="btn bg-delete">
                  <RiDeleteBin6Fill color="white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example" className="mt-5">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
