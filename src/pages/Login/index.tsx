import { Input, Button, Form } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/home");
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <section className="w-[320px] rounded-md border border-gray-400 bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-semibold">Login</h1>
        <Form className="flex flex-col gap-4">
          <Input placeholder="Email" type="email" />
          <Input.Password placeholder="Senha" />
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            onClick={handleNavigate}
          >
            Entrar
          </Button>
        </Form>

        <div className="my-4 flex items-center gap-2">
          <hr className="flex-grow border-t text-gray-400" />
          <span className="text-sm text-gray-500">ou</span>
          <hr className="flex-grow border-t text-gray-400" />
        </div>

        <Button icon={<GoogleOutlined />} className="w-full" type="default">
          Entrar com Google
        </Button>
      </section>
    </main>
  );
}

export default Login;
