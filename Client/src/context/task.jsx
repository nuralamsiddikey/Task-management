import { createContext, useContext, useEffect, useState } from "react";
import { base } from "../api";
import toast from "react-hot-toast";

const taskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("All");
  const [singleStatus,setSingleStatus] = useState('')
  const [sortBy, setSortBy] = useState("");
  const [search,setSearch] = useState("")
  const [task, setTask] = useState({
    id:"",
    title: "",
    body: "",
  });



  const fetchTasks = () =>
    fetch(base + `/task?sort=${sortBy}&status=${status}`)
      .then(async (res) => {
        if (res.ok) return res.json();
        else {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch tasks");
        }
      })
      .then((result) => {
        setTaskList(result?.data);
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred while fetching tasks");
      });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <taskContext.Provider
      value={{ taskList, fetchTasks, show, setShow,task,setTask,status,setStatus ,sortBy,setSortBy,singleStatus,setSingleStatus}}
    >
      {children}
    </taskContext.Provider>
  );
};


export const useTaskContext = () => {
  const { taskList, fetchTasks, show, setShow, task,setTask,status,setStatus,sortBy,setSortBy,singleStatus,setSingleStatus } =
    useContext(taskContext);
  return { taskList, fetchTasks, show, setShow ,task,setTask,status,setStatus,sortBy,setSortBy,singleStatus,setSingleStatus};
};
