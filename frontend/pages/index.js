import PostCard from "../components/PostCard/PostCard";
import PostForm from "../components/PostForm/PostForm";
import { useSelector } from "react-redux";
import { LOG_IN } from "../store/modules/user";
import wrapper from "../store/configureStore";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:7000/api/post/getPost").then((res) => {
      if (res.data.success) {
        setPosts([...res.data.doc]);
      } else {
        console.log(res.data.err);
      }
    });
  }, []);

  return (
    <div>
      <PostForm />
      {/* 포스트 map으로 렌더링 */}
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
}

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
