import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chatroom from "./_components/Chatroom/Chatroom.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/chatroom", element: <Chatroom /> },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
