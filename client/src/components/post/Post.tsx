import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PostInterface from "../../models/postInterface";
import { selectUser } from "../../userRedux/userSlice";
import { updatePost } from "../posts/postsSlice";
import axios from "axios";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Comments } from "../comments/Comments";
import moment from "moment";

interface PostProps {
  post: PostInterface;
}

export const Post = ({ post }: PostProps) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commentAmount, setCommentAmount] = useState<number | null>(null);
  const [likedAmount, setLikedAmount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `/api/comments/getCommentsAmount?postId=${post.id}`
        );
        setCommentAmount(data.data.length);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `/api/likes/getLikes?postId=${post.id}`
        );
        setLikedAmount(data.data.length);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [likedAmount]);

  const handleLike = async () => {
    setLiked(!liked);
    try {
      if (liked) {
        const { data } = await axios.post("/api/likes/addLike", { postId: post.id });
        setLikedAmount(data.data.length);
      }

      if (!liked) {
        const { data } = await axios.delete(`/api/likes/deleteLike?postId=${post.id}`);
        setLikedAmount(data.data.length);
      }
    } catch (error) {
      console.error(error);
    }
    console.log("likes:", liked);
  };

  const handleDeletePost = async (postId: number | null) => {
    try {
      const { data } = await axios.delete(`/api/posts/deletePost/${postId}`);
      dispatch(updatePost(data.data));
    } catch (error) {
      console.error(error);
    }
    console.log("post from handleDeletePost: ", post);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="ditails">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon
            className="moreIcon"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && post.userId === user.id && (
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          )}
        </div>

        <div className="content">
          <p>{post.description}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          {post.userId !== user.id ? (
            <div className="item">
              {likedAmount && user.id ? (
                <FavoriteOutlinedIcon className="like" onClick={handleLike} />
              ) : (
                <FavoriteBorderOutlinedIcon onClick={handleLike} />
              )}
              {likedAmount} likes
            </div>
          ) : (
            <FavoriteOutlinedIcon
              className="like"
              onClick={handleLike}
              style={{ cursor: "disable" }}
            />
          )}

          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            {commentAmount ? (
              <TextsmsOutlinedIcon className="commentIcon" />
            ) : (
              <TextsmsOutlinedIcon />
            )}
            {commentAmount} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && (
          <Comments
            postId={post.id}
            postUserId={post.userId}
            commentAmount={commentAmount}
            setCommentAmount={setCommentAmount}
          />
        )}
      </div>
    </div>
  );
};
