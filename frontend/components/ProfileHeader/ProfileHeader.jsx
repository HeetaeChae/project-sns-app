import styled from "styled-components";

import ProfileChange from "./ProfileChange/ProfileChange";
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
  return (
    <>
      <ProfileHeaderWrapper>
        <ProfileImage />
        <LineStyle />
        <ProfileChange />
      </ProfileHeaderWrapper>
    </>
  );
};

export default ProfileHeader;
