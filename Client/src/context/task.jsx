import { createContext, useContext, useEffect, useState } from "react";
import { base } from "../api";
import toast from "react-hot-toast";
import { useAuthContext } from "./auth";

const taskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("All");
  const [singleStatus, setSingleStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [action, setAction] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalTasks,setTotalTasks] = useState(0)

  const [task, setTask] = useState({
    id: "",
    title: "",
    body: "",
  });

  const { token } = useAuthContext();

  const storedToken = localStorage.getItem("token");

  const fetchTasks = () =>
    fetch(
      base +
        `/task?sort=${sortBy}&status=${status}&currentPage=${currentPage}&limit=${limit}`,
      {
        headers: {
          authorization: `Bearer ${token ? token : storedToken}`,
        },
      }
    )
      .then(async (res) => {
        if (res.ok) return res.json();
        else {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch tasks");
        }
      })
      .then((result) => {
        setTaskList(result?.data);
        setTotalPages(result.totalPages);
        setCurrentPage(result.currentPage);
        setTotalTasks(result.totalPosts)
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred while fetching tasks");
      });

  useEffect(() => {
    fetchTasks();
  }, [currentPage, sortBy, status, limit]);

  return (
    <taskContext.Provider
      value={{
        taskList,
        fetchTasks,
        show,
        setShow,
        task,
        setTask,
        status,
        setStatus,
        sortBy,
        setSortBy,
        singleStatus,
        setSingleStatus,
        action,
        setAction,
        totalPages,
        currentPage,
        setCurrentPage,
        limit,
        setLimit,
        totalTasks
      }}
    >
      {children}
    </taskContext.Provider>
  );
};

export const useTaskContext = () => {
  const {
    taskList,
    fetchTasks,
    show,
    setShow,
    task,
    setTask,
    status,
    setStatus,
    sortBy,
    setSortBy,
    singleStatus,
    setSingleStatus,
    action,
    setAction,
    totalPages,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    totalTasks
  } = useContext(taskContext);
  return {
    taskList,
    fetchTasks,
    show,
    setShow,
    task,
    setTask,
    status,
    setStatus,
    sortBy,
    setSortBy,
    singleStatus,
    setSingleStatus,
    action,
    setAction,
    totalPages,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    totalTasks
  };
};
