import { Avatar, Form, Input, DatePicker, Switch, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";

function RegisterEmployee() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-full items-center justify-center rounded-2xl bg-white p-4">
        <Form layout="vertical" className="w-full max-w-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <Avatar size={100} icon={<FaUser />} />
              <Upload showUploadList={false}>
                <Button size="small" className="mt-5" icon={<UploadOutlined />}>
                  Alterar
                </Button>
              </Upload>
            </div>
            <Form.Item label="Status" name="status" valuePropName="checked">
              <Switch />
            </Form.Item>
          </div>
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: "Por favor, insira o nome" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira o email" },
              { type: "email", message: "Email inválido" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="CPF"
            name="cpf"
            rules={[{ required: true, message: "Por favor, insira o CPF" }]}
          >
            <Input maxLength={11} />
          </Form.Item>

          <Form.Item
            label="Data de contratação"
            name="dataContratacao"
            rules={[{ required: true, message: "Por favor, selecione a data" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            label="CEP"
            name="cep"
            rules={[{ required: true, message: "Insira um CEP válido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Rua" name="rua">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Bairro" name="bairro">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Cidade" name="cidade">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Estado" name="estado">
            <Input disabled />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Cadastrar Funcionário
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RegisterEmployee;
