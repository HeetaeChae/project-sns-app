import styled from "styled-components";
import { PageHeader } from "antd";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOG_IN } from "../store/modules/user";
import { useEffect } from "react";
import wrapper from "../store/configureStore";

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: relative;
  padding-top: 100px;
  padding-bottom: 40px;
  border: 1px solid rgb(235, 237, 240);
`;
const PageHeaderStyle = styled(PageHeader)`
  border-bottom: 1px solid rgb(235, 237, 240);
  position: absolute;
  width: 100%;
  top: ${(props) => props.top};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const profile = ({ data }) => {
  return (
    <ProfileWrapper>
      <PageHeaderStyle title="프로필" top="0" />
      <ProfileHeader />
    </ProfileWrapper>
  );
};

export default profile;
