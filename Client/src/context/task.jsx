import { createContext, useContext, useEffect, useState } from "react";
import { base } from "../api";

const taskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [task,setTask] = useState([])

  useEffect(()=>{
       fetch(base+'/task')
       .then(res=> res.json())
       .then(result=>{
          setTask(result?.data)
       })
  },[])

  return <taskContext.Provider value={{task}}>{children}</taskContext.Provider>;
};

export const useTaskContext = ()=> {
    const {task} = useContext(taskContext)
    return {task}
}