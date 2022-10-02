import PostCard from "../components/PostCard/PostCard";
import PostForm from "../components/PostForm/PostForm";

export default function Home() {
  return (
    <div>
      {/* 로그인 중이면 true */}
      <PostForm />
      {/* 포스트 map으로 렌더링 */}
      <PostCard />
    </div>
  );
}
