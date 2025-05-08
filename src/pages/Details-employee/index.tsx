import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiEmployee from "../../service/axios/apiEmployee";
import { Avatar, Button, Spin, Tag } from "antd";
import { useGoBack } from "../../hooks/useGoBack";
import { FaUser } from "react-icons/fa";

function DetailsEmployee() {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleGoBack = useGoBack();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await apiEmployee.get(`/list-employee?id=${id}`);
        setEmployeeData(response.data);
      } catch (error) {
        setError("Erro ao carregar os dados do funcionário.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Spin spinning={loading}>
      <div className="container mx-auto rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Detalhes do Funcionário</h1>

        {employeeData ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 space-x-4">
              <Avatar
                size={100}
                src={employeeData.photo || undefined}
                icon={!employeeData.photo && <FaUser />}
              />
              <div>
                <h2 className="text-xl font-semibold">{employeeData.name}</h2>
                <p className="text-gray-600">{employeeData.email}</p>
                <p>
                  <Tag color={employeeData.status ? "green" : "red"}>
                    {employeeData.status ? "ATIVO" : "INATIVO"}
                  </Tag>
                </p>
              </div>
            </div>

            <div>
              <p className="font-semibold">CPF:</p>
              <p>{employeeData.cpf}</p>
            </div>

            <div>
              <p className="font-semibold">Data de Contratação:</p>
              <p>
                {new Date(employeeData.data_contracao).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="font-semibold">Endereço:</p>
              <p>
                {employeeData.rua}, {employeeData.bairro}, {employeeData.cidade}{" "}
                - {employeeData.estado}
              </p>
              <p>CEP: {employeeData.cep}</p>
            </div>
            <div className="flex items-end justify-end">
              <Button onClick={handleGoBack}>Retornar</Button>
            </div>
          </div>
        ) : (
          <p>Funcionário não encontrado.</p>
        )}
      </div>
    </Spin>
  );
}

export default DetailsEmployee;
