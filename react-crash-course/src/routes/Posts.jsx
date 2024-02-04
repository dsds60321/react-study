import { Outlet } from "react-router-dom";
import PostList from "../components/PostList.jsx";

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostList />
      </main>
    </>
  );
}

export default Posts;
