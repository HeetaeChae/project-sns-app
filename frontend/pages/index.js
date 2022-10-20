import PostCard from "../components/PostCard/PostCard";
import PostForm from "../components/PostForm/PostForm";
import { LOG_IN } from "../store/modules/user";
import { GET_POST } from "../store/modules/post";
import wrapper from "../store/configureStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin, notification } from "antd";
import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";
import Head from "next/head";

const SpinWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const getPostFailure = () => {
  notification.open({
    message: "포스트 로딩",
    description: "마지막 포스트입니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#e91010",
        }}
      />
    ),
  });
};

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);
  const [skip, setSkip] = useState(8);

  const [isFetching, setIsFetching] = useState(false);
  const fetchMorePosts = async () => {
    await setIsFetching(true);
    await axios
      .post("http://localhost:7000/api/post/getPost", { skip })
      .then((res) => {
        if (res.data.success) {
          if (res.data.doc.length === 0) {
            getPostFailure();
          }
          dispatch({ type: GET_POST, payload: res.data.doc });
          setSkip(skip + 8);
        } else {
          console.log(res.data.err);
        }
      });
    setIsFetching(false);
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && isFetching === false) {
      fetchMorePosts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div>
      <Head>
        <title>SNS-APP | 홈</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/logo.png" />
      </Head>
      {user.isLoggedIn && <PostForm />}
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
      {isFetching && (
        <SpinWrapper>
          <Spin />
        </SpinWrapper>
      )}
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      //로그인 유저 데이터 구현
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
        const isLoggedIn = await res.data.success;
        if (isLoggedIn) {
          store.dispatch({ type: LOG_IN, payload });
        }
      } catch (err) {
        console.log(err);
      }
      //포스트 데이터 구현
      try {
        const res = await axios.post("http://localhost:7000/api/post/getPost");
        const payload = await res.data.doc;
        store.dispatch({ type: GET_POST, payload });
      } catch (err) {
        console.log(err);
      }
    }
);
