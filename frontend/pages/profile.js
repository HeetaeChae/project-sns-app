import styled from "styled-components";
import { PageHeader } from "antd";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import axios from "axios";
import { LOG_IN } from "../store/modules/user";
import wrapper from "../store/configureStore";
import Head from "next/head";

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

const profile = () => {
  return (
    <>
      <Head>
        <title>SNS-APP | 프로필</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <ProfileWrapper>
        <PageHeaderStyle title="프로필" top="0" />
        <ProfileHeader />
      </ProfileWrapper>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req?.headers.cookie;
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      try {
        const res = await axios("http://localhost:7000/api/user/getUser", {
          withCredentials: true,
        });
        const payload = await res.data.doc;
        store.dispatch({ type: LOG_IN, payload });
      } catch (err) {
        console.log(err);
      }
    }
);

export default profile;
