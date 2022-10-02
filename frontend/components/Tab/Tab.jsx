import styled from "styled-components";
import Login from "./Login/Login";

import Menubar from "./Menubar/Menubar";
import User from "./User/User";

const TabWrapper = styled.div`
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const Tab = () => {
  return (
    <TabWrapper>
      <User />
      <Login />
      <Menubar />
    </TabWrapper>
  );
};

export default Tab;
