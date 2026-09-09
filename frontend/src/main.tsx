import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RoutesComponent from "./Routes";
import ErrorBoundary from "./components/CommonPages/ErrorBoundary";

ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RoutesComponent />
    </ErrorBoundary>
  </React.StrictMode>,
);