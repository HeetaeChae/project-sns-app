import PostCard from "../components/PostCard/PostCard";
import PostForm from "../components/PostForm/PostForm";
import { LOG_IN } from "../store/modules/user";
import { ADD_POST } from "../store/modules/post";
import wrapper from "../store/configureStore";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_COMMENT } from "../store/modules/comment";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios.get("http://localhost:7000/api/post/getPost").then((res) => {
      if (res.data.success) {
        dispatch({ type: ADD_POST, payload: res.data.doc });
      } else {
        console.log(res.data.err);
      }
    });
  }, []);

  return (
    <div>
      {user.isLoggedIn && <PostForm />}
      {posts.map((post, index) => (
        <PostCard post={post} key={index} />
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
        if (payload) {
          store.dispatch({ type: LOG_IN, payload });
        }
      } catch (err) {
        console.log(err);
      }
    }
);
