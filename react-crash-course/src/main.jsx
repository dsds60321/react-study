import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Posts, {loader as postsLoader} from "./routes/Posts.jsx";
import NewPost, {action as newPostAction} from "./routes/NewPost.jsx";
import PostDetails, {loader as postDetailsLoader} from "./components/PostDetail.jsx";
import RootLayout from "./routes/ReactLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Posts />,
        loader : postsLoader,
        children: [
            { path: "/create-post", element: <NewPost /> , action: newPostAction},
            {path: "/:id", element: <PostDetails />, loader: postDetailsLoader }
        ],
      },
      ,
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
