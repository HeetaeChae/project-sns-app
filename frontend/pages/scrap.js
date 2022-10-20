import styled from "styled-components";
import { PageHeader } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import wrapper from "../store/configureStore";
import { LOG_IN } from "../store/modules/user";
import ScrapCard from "../components/ScrapCard/ScrapCard";
import Head from "next/head";

const ScrapWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  padding-top: 100px;
  padding-bottom: 40px;
  border: 1px solid rgb(235, 237, 240);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ScrapCardWrapper = styled.div`
  width: 80%;
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

const scrap = () => {
  const user = useSelector((state) => state.user);
  const [scraps, setScraps] = useState([]);
  const [deleteScrap, setDeleteScrap] = useState("");

  useEffect(() => {
    const variable = { user: user.me._id };
    axios
      .post("http://localhost:7000/api/scrap/getScrap", variable)
      .then((res) => {
        if (res.data.success) {
          setScraps([...res.data.doc]);
        } else {
          console.log(res.data.err);
        }
      });
  }, []);
  useEffect(() => {
    const deletedScraps = scraps.filter((scrap) => scrap._id !== deleteScrap);
    setScraps([...deletedScraps]);
  }, [deleteScrap]);
  return (
    <>
      <Head>
        <title>SNS-APP | 스크랩</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <ScrapWrapper>
        <PageHeaderStyle title="스크랩" top="0" />
        <ScrapCardWrapper>
          <ScrapCard scraps={scraps} setDeleteScrap={setDeleteScrap} />
        </ScrapCardWrapper>
      </ScrapWrapper>
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

export default scrap;
