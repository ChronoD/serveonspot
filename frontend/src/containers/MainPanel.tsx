import { Button, Form, Input, Checkbox } from "antd";
import { useState } from "react";
import { CustomerPanel } from "./CustomerPanel";
import { StaffPanel } from "./StaffPanel";

interface Props {}

export function MainPanel({}: Props) {
  const [authorizedMode, setAuthorizedMode] = useState<boolean>(false);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setAuthorizedMode(!authorizedMode);
        }}
      >
        {!authorizedMode ? "Darbuotojams" : "Grįžti"}
      </Button>
      {authorizedMode && <StaffPanel />}
      {!authorizedMode && <CustomerPanel />}
    </div>
  );
}
