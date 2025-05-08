import { Button, Space, Table, Tag, Tooltip } from "antd";
import type { TableProps } from "antd";
import { MdDelete } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import apiEmployee from "../../service/axios/apiEmployee";

export interface DataType {
  key: string;
  name: string;
  hiring: string;
  email: string;
  status: string;
}

interface EmployeeTableProps {
  data: DataType[];
  loading: boolean;
}

const EmployeeTable = ({ data, loading }: EmployeeTableProps) => {
  const navigate = useNavigate();
  const editUser = (id: string) => {
    navigate(`view-employee/${id}`);
  };

  const deleteUser = async (id: string) => {
    console.log(id);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Tooltip title={text}>
          <p className="font-medium">
            {text.length > 30 ? `${text.slice(0, 30)}...` : text}
          </p>
        </Tooltip>
      ),
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
      render: (text: string) => {
        const [local, domain] = text.split("@");
        const truncatedLocal =
          local.length > 20 ? `${local.slice(0, 20)}...` : local;
        const displayEmail = `${truncatedLocal}@${domain}`;
        return <Tooltip title={text}>{displayEmail}</Tooltip>;
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        let color = status === "ativo" ? "green" : "volcano";
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Visualizar">
            <Button
              type="default"
              onClick={() => editUser(record.key)}
              shape="circle"
              icon={<IoMdEye />}
            />
          </Tooltip>
          <Tooltip title="Deletar">
            <Button
              type="default"
              danger
              shape="circle"
              onClick={() => deleteUser(record.key)}
              icon={<MdDelete />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 8 }}
      scroll={{ x: "max-content" }}
      loading={loading}
    />
  );
};

export default EmployeeTable;
