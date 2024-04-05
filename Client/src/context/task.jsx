import { createContext, useContext, useEffect, useState } from "react";
import { base } from "../api";
import toast from "react-hot-toast";

const taskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [show, setShow] = useState(false);
  
  const [status, setStatus] = useState("Todo");
  const [task, setTask] = useState({
    id:"",
    title: "",
    body: "",
  });

  const fetchTasks = () =>
    fetch(base + "/task")
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
      value={{ taskList, fetchTasks, show, setShow,task,setTask,status,setStatus }}
    >
      {children}
    </taskContext.Provider>
  );
};


export const useTaskContext = () => {
  const { taskList, fetchTasks, show, setShow, task,setTask,status,setStatus } =
    useContext(taskContext);
  return { taskList, fetchTasks, show, setShow ,task,setTask,status,setStatus};
};
