import PostCard from "../components/PostCard/PostCard";
import PostForm from "../components/PostForm/PostForm";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      {user.me._id && <PostForm />}
      {/* 포스트 map으로 렌더링 */}
      <PostCard />
    </div>
  );
}
