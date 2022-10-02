import styled from "styled-components";
import { Row, Col } from "antd";

import Navbar from "./Navbar/Navar";
import Footer from "./Footer/Footer";
import Tab from "../Tab/Tab";

const LayoutWrapper = styled.div`
  background-color: rgb(242, 249, 255);
`;
const NavbarWrapper = styled.div`
  padding: 0 calc((100vw - 1000px) / 2);
  background-color: white;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
`;
const MainWrapper = styled.div`
  padding: 0 calc((100vw - 1500px) / 2);
  margin-top: 5rem;
  padding-top: 60px;
`;
const FooterWrapper = styled.div`
  padding: 0 calc((100vw - 1000px) / 2);
  padding-top: 60px;
  width: 100%;
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <MainWrapper>
        <Row>
          <Col xs={24} sm={24} md={8} lg={6}>
            <Tab />
          </Col>
          <Col xs={24} sm={24} md={16} lg={18}>
            {children}
          </Col>
        </Row>
      </MainWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
