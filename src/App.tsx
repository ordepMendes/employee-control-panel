import { Button } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/home/register-employee");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <section className="flex w-full max-w-6xl flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumbs />
          {location.pathname != "/home" ? (
            <></>
          ) : (
            <Button type="primary" onClick={handleNavigate}>
              Adicionar funcionário
            </Button>
          )}
        </div>
        <Outlet />
        <p className="text-center text-gray-400">
          Desenvolvido por Pedro Mendes
        </p>
      </section>
    </div>
  );
}

export default App;
