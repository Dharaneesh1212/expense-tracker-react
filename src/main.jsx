import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ExpenseContextProvider } from "./context/context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ExpenseContextProvider>
      <App />
    </ExpenseContextProvider>
  </React.StrictMode>
);
