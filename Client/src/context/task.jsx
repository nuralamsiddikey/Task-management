import { createContext, useContext, useEffect, useState } from "react";
import { base } from "../api";
import toast from 'react-hot-toast'

const taskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [task, setTask] = useState([]);

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
    setTask(result?.data);
  })
  .catch((error) => {
    toast.error(error.message || "An error occurred while fetching tasks");
  });


  useEffect(() =>{ fetchTasks()}, []);

  return (
    <taskContext.Provider value={{ task ,fetchTasks}}>{children}</taskContext.Provider>
  );
};

export const useTaskContext = () => {
  const { task,fetchTasks } = useContext(taskContext);
  return { task ,fetchTasks};
};
