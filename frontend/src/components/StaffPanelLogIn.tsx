import { Button, Form, Input } from "antd";
import { LoginDetails } from "../state/dataTypes";

interface Props {
  onSubmit: (values: LoginDetails) => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function StaffPanelLogIn({ onSubmit }: Props) {
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      <Form.Item
        label="Vartotojo vardas"
        name="username"
        rules={[{ required: true, message: "Vartotojo vardas būtinas!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Slaptažodis"
        name="password"
        rules={[{ required: true, message: "Slaptažodis būtinas!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Prisijungti
        </Button>
      </Form.Item>
    </Form>
  );
}
