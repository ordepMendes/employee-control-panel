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
    handle: { breadcrumb: "Inicio" },
    children: [
      {
        index: true,
        element: <EmployeeList />,
        handle: { breadcrumb: "Home" },
      },
      {
        path: "register-employee",
        element: <RegisterEmployee />,
        handle: { breadcrumb: "Registrar Funcionario" },
      },
      {
        path: "edit-employee/:id",
        element: <RegisterEmployee />,
        handle: { breadcrumb: "Editar Funcionario" },
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);
