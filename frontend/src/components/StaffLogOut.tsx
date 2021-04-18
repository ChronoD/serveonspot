import { Button } from "antd";

interface Props {
  onClick: () => void;
}

export function StaffLogOut({ onClick }: Props) {
  return <Button onClick={onClick}>Atsijungti</Button>;
}
