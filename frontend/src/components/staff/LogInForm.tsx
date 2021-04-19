import { Button, Col, Form, Input, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import { LoginDetails } from "../../state/dataTypes";

interface Props {
  onSubmit: (values: LoginDetails) => void;
  loginError: Error | undefined;
  closeLoginError: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function StaffLogIn({ onSubmit, loginError, closeLoginError }: Props) {
  return (
    <Row>
      <Modal visible={!!loginError} onCancel={closeLoginError} footer={null}>
        <p>Prisijungti nepavyko</p>
      </Modal>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Vartotojas"
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
    </Row>
  );
}
