import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectPost, selectPosts, updatePosts } from "./postsSlice";
import { Post } from "../post/Post";
import PostInterface from "../../models/postInterface";
import axios from "axios";

interface PostsProps {
  userId: number;
}

export const Posts = ({ userId }: PostsProps) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const post = useAppSelector(selectPost);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `/api/posts/getPosts?userId=${userId}`
        );
        dispatch(updatePosts(data.data));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [post]);

  return (
    <div className="posts">
      {posts.map((post: PostInterface) => {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
};
