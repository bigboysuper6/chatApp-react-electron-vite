import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./samples/node-api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@sass/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <>
        <App />
    </>
);

postMessage({ payload: "removeLoading" }, "*");
