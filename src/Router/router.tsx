import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import EmployeeList from "../pages/Employee-list";
import RegisterEmployee from "../pages/Register-employee";
import Login from "../pages/Login";
import Page404 from "../pages/Page404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <App />,
    children: [
      {
        index: true,
        element: <EmployeeList />,
      },
      {
        path: "register-employee",
        element: <RegisterEmployee />,
      },
      {
        path: "edit-employee/:id",
        element: <RegisterEmployee />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);
