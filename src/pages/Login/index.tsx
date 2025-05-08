import { useState } from "react";
import { Input, Button, Form, Spin, notification } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../service/firebase/firebaseConfig.ts";

function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (message: string) => {
    api.error({
      message: "Erro",
      description: message,
    });
  };

  function handleNavigate() {
    navigate("/home");
  }

  const loginGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      handleNavigate();
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        openNotificationWithIcon("Popup fechado pelo usuário.");
      } else {
        openNotificationWithIcon(
          "Ocorreu algum erro ao logar com o Google. Espere um momento e tente novamente.",
        );
      }
      console.log(error.code);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      if (userCredential.user) {
        handleNavigate();
      }
    } catch (error: any) {
      if (error.errorFields) {
        return;
      }

      switch (error.code) {
        case "auth/invalid-email":
          openNotificationWithIcon("E-mail inválido.");
          break;
        case "auth/user-disabled":
          openNotificationWithIcon("Este usuário está desativado.");
          break;
        case "auth/user-not-found":
          openNotificationWithIcon("Usuário não encontrado.");
          break;
        case "auth/invalid-credential":
          openNotificationWithIcon(
            "E-mail ou senha inválido, tente novamente.",
          );
          break;
        default:
          openNotificationWithIcon(
            "Erro desconhecido. Verifique os dados e tente novamente.",
          );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      {contextHolder}
      <Spin spinning={loading}>
        <section className="w-[320px] rounded-md border border-gray-400 bg-white p-6 shadow-md">
          <h1 className="mb-4 text-center text-2xl font-semibold">Login</h1>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSignIn}
            className="flex flex-col gap-1"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Insira seu e-mail" },
                { type: "email", message: "Formato de e-mail inválido" },
              ]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Insira sua senha" }]}
            >
              <Input.Password placeholder="Senha" />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="w-full">
              Entrar
            </Button>
          </Form>

          <div className="my-4 flex items-center gap-2">
            <hr className="flex-grow border-t text-gray-400" />
            <span className="text-sm text-gray-500">ou</span>
            <hr className="flex-grow border-t text-gray-400" />
          </div>

          <Button
            icon={<GoogleOutlined />}
            className="w-full"
            type="default"
            onClick={loginGoogle}
          >
            Entrar com Google
          </Button>
        </section>
      </Spin>
    </main>
  );
}

export default Login;
