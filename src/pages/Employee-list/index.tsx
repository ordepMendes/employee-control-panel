import EmployeeTable, { DataType } from "../../components/EmployeeTable";

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    hiring: "12/08/2016",
    email: "khazix@gmail.com",
    status: ["ativo"],
  },
  {
    key: "2",
    name: "Jane Doe",
    hiring: "03/11/2018",
    email: "jane.doe@example.com",
    status: ["ativo"],
  },
  {
    key: "3",
    name: "Will Smith",
    hiring: "07/05/2015",
    email: "will.smith@example.com",
    status: ["inativo"],
  },
];

function EmployeeList() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full rounded-2xl bg-white p-4">
        <EmployeeTable data={data} />
      </div>
    </div>
  );
}

export default EmployeeList;
