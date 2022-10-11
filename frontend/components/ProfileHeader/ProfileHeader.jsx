import styled from "styled-components";
import { useSelector } from "react-redux";

import ProfileEdit from "./ProfileEdit/ProfileEdit";
import ProfileImage from "./ProfileImage/ProfileImage";

const ProfileHeaderWrapper = styled.div`
  width: 65%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LineStyle = styled.div`
  height: 320px;
  border-left: 1px solid rgb(235, 237, 240);
  @media screen and (max-width: 1036px) {
    display: none;
  }
`;

const ProfileHeader = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <>
      <ProfileHeaderWrapper>
        <ProfileImage me={me} />
        <LineStyle />
        <ProfileEdit me={me} />
      </ProfileHeaderWrapper>
    </>
  );
};

export default ProfileHeader;
