import { useEffect, useState } from "react";
import EmployeeTable, { DataType } from "../../components/EmployeeTable";
import apiEmployee from "../../service/axios/apiEmployee";
import { notification } from "antd";

function EmployeeList() {
  const [employees, setEmployees] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (message: string) => {
    api.success({
      message: "Sucesso",
      description: message,
    });
  };

  const deleteUser = async (id: string) => {
    console.log(id);
    try {
      await apiEmployee.delete(`/delete-employee?id=${id}`);
      openNotificationWithIcon("Funcionario Deletado com sucesso!");
      getEmployees();
    } catch (error) {
      alert(error);
    }
  };

  const getEmployees = async () => {
    setLoading(true);
    try {
      const response = await apiEmployee.get("/list-employees");

      const formattedData: DataType[] = response.data.map((employee: any) => ({
        key: employee.id,
        name: employee.name,
        hiring: new Date(employee.data_contracao).toLocaleDateString("pt-BR"),
        email: employee.email,
        status: employee.status ? "ativo" : "inativo",
      }));

      setEmployees(formattedData);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);
  return (
    <div className="w-full overflow-x-auto">
      {contextHolder}
      <div className="min-w-full rounded-2xl bg-white p-4">
        <EmployeeTable
          data={employees}
          loading={loading}
          onDelete={deleteUser}
        />
      </div>
    </div>
  );
}

export default EmployeeList;
