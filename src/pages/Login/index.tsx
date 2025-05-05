import { useState } from "react";
import { Input, Button, Form } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../service/firebase/firebaseConfig.ts";

type userType = {
  email: string;
  password: string;
};

function Login() {
  const [user, setUser] = useState<userType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/home");
  }

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      handleNavigate();
    } catch (error) {
      console.error("Erro ao logar: " + error);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      );

      if (userCredential.user) {
        handleNavigate();
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <section className="w-[320px] rounded-md border border-gray-400 bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-semibold">Login</h1>
        <Form className="flex flex-col gap-4">
          <Input
            placeholder="Email"
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input.Password
            placeholder="Senha"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            onClick={handleSignIn}
          >
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
    </main>
  );
}

export default Login;
