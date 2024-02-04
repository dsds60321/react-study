import Post from "./Post.jsx";
import classes from "./PostsList.module.css";
import { useEffect, useState } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      const response = await fetch("http://localhost:8080/posts");
      const resData = await response.json();
      setPosts(resData.posts);
      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json",
      },
    });
    // setPosts([postData, ...posts]); 이전 데이터를 갱신할떄 사용하는건 비추
    // 리액트는 상태 갱신 함수를 바로 실행해 두는게 아니라 화살표 함수를 통해 리액트에 의해 자동으로 호출되게 하여야함
    setPosts((existingPost) => [postData, ...existingPost]);
  }
  return (
    <>
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body}></Post>
          ))}
        </ul>
      )}

      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}

      {isFetching && (
        <div style={{ textAlign: "center", color: "white" }}>
          <p>Loading posts...</p>
        </div>
      )}
    </>
  );
}

export default PostList;
