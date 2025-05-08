import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import EmployeeList from "../pages/Employee-list";
import RegisterEmployee from "../pages/Register-employee";
import Login from "../pages/Login";
import Page404 from "../pages/Page404";
import { PrivateRoute } from "./PrivateRoute";
import DetailsEmployee from "../pages/Details-employee";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
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
        handle: { breadcrumb: "Cadastrar Funcionario" },
      },
      {
        path: "view-employee/:id",
        element: <DetailsEmployee />,
        handle: { breadcrumb: "Visualizar Funcionario" },
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);
