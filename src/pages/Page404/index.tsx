import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2.5">
        <h1 className="text-9xl font-semibold">404 :(</h1>
        <p>Ops! Essa página não foi encontrada.</p>
        <Button onClick={handleGoBack}>Retornar</Button>
      </div>
    </div>
  );
}

export default Page404;
