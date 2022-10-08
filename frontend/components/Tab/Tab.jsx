import styled from "styled-components";
import Login from "./Login/Login";
import { useSelector } from "react-redux";

import Menubar from "./Menubar/Menubar";
import User from "./User/User";

const TabWrapper = styled.div`
  margin-bottom: 50px;
  margin-right: 10px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 0;
  }
  @media (max-width: 620px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
  }
`;

const Tab = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <TabWrapper>
      {isLoggedIn ? <User /> : <Login />}
      <Menubar />
    </TabWrapper>
  );
};

export default Tab;
