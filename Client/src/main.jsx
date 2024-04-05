import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TaskContextProvider } from "./context/task.jsx";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <TaskContextProvider>
      <App />
      <Toaster />
    </TaskContextProvider>
  </AuthContextProvider>
);
