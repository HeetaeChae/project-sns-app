import styled from "styled-components";
import { Row, Col } from "antd";

import Navbar from "./Navbar/Navar";
import Footer from "./Footer/Footer";
import Tab from "../Tab/Tab";

const LayoutWrapper = styled.div`
  background-color: rgb(250, 250, 249);
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
  margin-top: 4rem;
  padding-top: 60px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
const ChildrenWrapper = styled.div`
  width: 75%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const TapWrapper = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
  }
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
        <TapWrapper>
          <Tab />
        </TapWrapper>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </MainWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
