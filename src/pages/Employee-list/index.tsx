import { useEffect, useState } from "react";
import EmployeeTable, { DataType } from "../../components/EmployeeTable";
import apiEmployee from "../../service/axios/apiEmployee";

function EmployeeList() {
  const [employees, setEmployees] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getEmployees = async () => {
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
      <div className="min-w-full rounded-2xl bg-white p-4">
        <EmployeeTable data={employees} loading={loading} />
      </div>
    </div>
  );
}

export default EmployeeList;
