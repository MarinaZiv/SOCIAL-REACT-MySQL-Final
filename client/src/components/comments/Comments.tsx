import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import CommentInterface from "../../models/commentInterface";
import { selectUser } from "../../userRedux/userSlice";
import { commentsSelector, updateComments } from "./commentSlice";
import axios from "axios";
import moment from "moment";

interface CommentProps {
  postId: any;
  commentAmount: number | null;
  setCommentAmount: Function;
}

export const Comments = ({
  postId,
  commentAmount,
  setCommentAmount,
}: CommentProps) => {
  const [description, setDescription] = useState("");
  const user = useAppSelector(selectUser);
  const comments = useAppSelector(commentsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await axios.get(
          `/api/comments/getComments?postId=${postId}`
        );
        dispatch(updateComments(data.data));
        setCommentAmount(data.data.length);
      } catch (error) {
        console.error(error);
      }
    };
    getComments();
  }, [comments, commentAmount]);


  const handleSubmitComment = async (e: React.FormEvent<Element> | any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/comments/addComments", { description, postId });
      setDescription(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={user.profilePic} alt="" />
        <input
          className="input"
          type="text"
          name="description"
          placeholder="write a comment"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSubmitComment}>Send</button>
      </div>

      {comments.map((comment: CommentInterface) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.description}</p>
          </div>
          <div className="date">
            <span>{moment(comment.createdAt).fromNow()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
