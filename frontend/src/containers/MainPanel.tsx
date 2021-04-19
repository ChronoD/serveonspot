import { Button, Row, Col, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCustomerMode } from "../state/sliceMainPanel";
import { useAppSelector } from "../state/hooks";
import { CustomerPanel } from "./CustomerPanel";
import { StaffPanel } from "./StaffPanel";
import { Content, Footer, Header } from "antd/lib/layout/layout";

interface Props {}

export function MainPanel({}: Props) {
  const {
    mainPanel: { customerMode },
    customer: { appointmentInfo },
    staff: { userInfo },
  } = useAppSelector((state) => state);

  const dispatch = useDispatch();
  function toggleMode() {
    dispatch(toggleCustomerMode());
  }
  return (
    <Layout>
      <Header />
      <Content style={{ minHeight: "30rem", paddingTop: "1rem" }}>
        <Col span={24} offset={18}>
          {!appointmentInfo && !userInfo && (
            <Button onClick={toggleMode}>
              {customerMode ? "Darbuotojams" : "Grįžti"}
            </Button>
          )}
        </Col>

        <Row justify="center" align="middle">
          {!customerMode && <StaffPanel />}
          {customerMode && <CustomerPanel />}
        </Row>
      </Content>
      <Footer>Serve-On-Spot App, 2021</Footer>
    </Layout>
  );
}
