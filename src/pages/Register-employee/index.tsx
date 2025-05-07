import {
  Avatar,
  Form,
  Input,
  DatePicker,
  Switch,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";
import { useGoBack } from "../../hooks/useGoBack";
import apiCep from "../../service/axios/apiCep.ts";
import { useState } from "react";
import dayjs from "dayjs";

type EmployeeDataType = {
  nome: string;
  email: string;
  status: boolean;
  photo?: string;
  cpf: string;
  data: string;
  cep: string;
  rua?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
};

function RegisterEmployee() {
  const HandleGoBack = useGoBack();
  const [employeeData, setEmployeeData] = useState<EmployeeDataType>({
    nome: "",
    email: "",
    status: false,
    photo: "",
    cpf: "",
    data: "",
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [form] = Form.useForm();
  const handleInputChange = (field: keyof EmployeeDataType, value: any) => {
    setEmployeeData((prev) => ({ ...prev, [field]: value }));
  };

  const searchCep = async (cep: string) => {
    try {
      const response = await apiCep.get(`${cep}/json/`);
      if (response.data.erro) {
        message.error("CEP não encontrado");
        return;
      }
      setEmployeeData((prev) => ({
        ...prev,
        rua: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        estado: response.data.uf,
      }));
    } catch (error) {
      message.error("Erro ao buscar o CEP");
    }
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        console.log("Dados do funcionário:", employeeData);
      })
      .catch((errorInfo) => {
        console.log("Erro de validação:", errorInfo);
      });
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-full items-center justify-center rounded-2xl bg-white p-4">
        <Form
          form={form}
          layout="vertical"
          className="w-full max-w-xl space-y-4"
          onFinish={handleSubmit}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <Avatar
                size={100}
                src={employeeData.photo || undefined}
                icon={!employeeData.photo && <FaUser />}
              />
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    if (e.target?.result) {
                      setEmployeeData((prev) => ({
                        ...prev,
                        photo: e.target?.result as string,
                      }));
                    }
                  };
                  reader.readAsDataURL(file);
                  return false;
                }}
              >
                <Button size="small" className="mt-5" icon={<UploadOutlined />}>
                  Alterar
                </Button>
              </Upload>
            </div>
            <Form.Item label="Status">
              <Switch
                checked={employeeData.status}
                onChange={(value) => handleInputChange("status", value)}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Nome"
            name="nome"
            required
            rules={[{ required: true, message: "Por favor, insira o nome" }]}
          >
            <Input
              value={employeeData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            required
            rules={[
              { required: true, message: "Por favor, insira o email" },
              { type: "email", message: "Email inválido" },
            ]}
          >
            <Input
              value={employeeData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="CPF"
            name="cpf"
            required
            rules={[
              { required: true, message: "Por favor, insira o CPF" },
              {
                pattern: /^[0-9]{11}$/,
                message: "CPF deve ter 11 dígitos numéricos",
              },
            ]}
          >
            <Input
              value={employeeData.cpf}
              maxLength={11}
              onChange={(e) => handleInputChange("cpf", e.target.value)}
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="Data de contratação"
            name="dataContratacao"
            required
            rules={[{ required: true, message: "Por favor, selecione a data" }]}
          >
            <DatePicker
              className="w-full"
              value={employeeData.data ? dayjs(employeeData.data) : undefined}
              onChange={(dateString) => handleInputChange("data", dateString)}
            />
          </Form.Item>

          <Form.Item
            label="CEP"
            name="cep"
            required
            rules={[
              { required: true, message: "Insira um CEP válido" },
              {
                pattern: /^[0-9]{8}$/,
                message: "CEP deve ter 8 dígitos numéricos",
              },
            ]}
          >
            <Input
              value={employeeData.cep}
              onChange={(e) => handleInputChange("cep", e.target.value)}
              onBlur={() => searchCep(employeeData.cep)}
            />
          </Form.Item>

          <Form.Item label="Rua">
            <Input value={employeeData.rua} disabled />
          </Form.Item>

          <Form.Item label="Bairro">
            <Input value={employeeData.bairro} disabled />
          </Form.Item>

          <Form.Item label="Cidade">
            <Input value={employeeData.cidade} disabled />
          </Form.Item>

          <Form.Item label="Estado">
            <Input value={employeeData.estado} disabled />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button type="default" onClick={HandleGoBack}>
                Retornar
              </Button>
              <Button type="primary" htmlType="submit">
                Cadastrar Funcionário
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RegisterEmployee;
