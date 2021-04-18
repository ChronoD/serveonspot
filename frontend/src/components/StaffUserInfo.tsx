import { Button } from "antd";
import { UserInfo } from "../state/dataTypes";
import { Col, Row } from "antd";

interface Props {
  userInfo: UserInfo;
  logout: () => void;
}

export function StaffUserInfo({ userInfo, logout }: Props) {
  return (
    <>
      <Row>
        <Col span={6} offset={16}>
          <Row justify="end">
            <Button onClick={logout}>Atsijungti</Button>
          </Row>
          <Row justify="end">
            <div>{`Prisijunges kaip:`}</div>
          </Row>
          <Row justify="end" align="middle">
            <div>
              {userInfo.specialist !== null
                ? userInfo.specialist.specialistInfo
                : userInfo.authority}
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
}
