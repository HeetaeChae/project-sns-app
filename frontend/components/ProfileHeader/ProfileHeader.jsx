import styled from "styled-components";
import { useSelector } from "react-redux";

import ProfileEdit from "./ProfileEdit/ProfileEdit";
import ProfileImage from "./ProfileImage/ProfileImage";

const ProfileHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileHeader = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <>
      <ProfileHeaderWrapper>
        <ProfileImage me={me} />
        <ProfileEdit me={me} />
      </ProfileHeaderWrapper>
    </>
  );
};

export default ProfileHeader;
