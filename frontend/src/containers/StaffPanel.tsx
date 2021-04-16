import { Button, Form, Input, Checkbox } from "antd";
import { useState } from "react";
import { AppointmentsList } from "../components/AppointmentsList";
import { LogOutButton } from "../components/LogOutButton";
import { SpecialistsList } from "../components/SpecialistsList";
import { authenticateStaffMember } from "../functions/apiFunctions";
import { Specialist } from "../state/dataTypes";

interface Props {}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export interface LoginDetails {
  username: string;
  password: string;
}

export function StaffPanel({}: Props) {
  const [specialist, setSpecialist] = useState<Specialist | undefined>(
    undefined
  );

  const onFinish = (values: LoginDetails) => {
    authenticateStaffMember(values, setSpecialist);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <LogOutButton />
      <div>
        {!specialist && (
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Prisijungti
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
      {specialist && <AppointmentsList />}
    </div>
  );
}
