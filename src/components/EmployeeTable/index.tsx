import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

export interface DataType {
  key: string;
  name: string;
  hiring: string;
  email: string;
  status: string[];
}

interface EmployeeTableProps {
  data: DataType[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    render: (text) => <p className="font-medium">{text}</p>,
  },
  {
    title: "Contratação",
    dataIndex: "hiring",
    key: "hiring",
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => (
      <>
        {status.map((status) => {
          let color = status === "ativo" ? "green" : "volcano";
          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Ações",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>Editar</a>
        <a>Deletar</a>
      </Space>
    ),
  },
];

const EmployeeTable = ({ data }: EmployeeTableProps) => {
  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 8 }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default EmployeeTable;
