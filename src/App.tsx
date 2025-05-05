import { Button, Dropdown, Popconfirm, Space } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { LuUserCog } from "react-icons/lu";
import { RxExit } from "react-icons/rx";
import Breadcrumbs from "./components/Breadcrumbs";
import { auth } from "./service/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    key: "2",
    label: "Profile",
    icon: <CiUser />,
    disabled: true,
  },
  {
    key: "4",
    label: "Sair",
    icon: <RxExit />,
    onClick: () => signOut(auth),
  },
];

function App() {
  const user = auth.currentUser;
  const location = useLocation();
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/home/register-employee");
  }

  const providerId = user?.providerData[0]?.providerId;
  const loginMethod =
    providerId === "google.com"
      ? "Google"
      : providerId === "password"
        ? "E-mail e senha"
        : "Desconhecido";
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <section className="flex w-full max-w-6xl flex-col gap-4">
        <header className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Método de acesso:</span>
            <span className="text-sm font-medium text-gray-800">
              {loginMethod}
            </span>
          </div>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space className="cursor-pointer">
                <Popconfirm
                  title="Logout"
                  description="Você deseja realmente sair?"
                  okText="Sim"
                  cancelText="Não"
                >
                  <LuUserCog size={20} />
                </Popconfirm>
              </Space>
            </a>
          </Dropdown>
        </header>
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
        <p className="mt-8 text-center text-sm text-gray-400">
          Desenvolvido por Pedro Mendes
        </p>
      </section>
    </div>
  );
}

export default App;
