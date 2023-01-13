import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { updatePost } from "../posts/postsSlice";
import { selectUser } from "../../userRedux/userSlice";
import Gallery from "../../assets/8.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import axios from "axios";

export const Share = () => {
  const [file, setFile] = useState<any>();
  const [description, setDescription] = useState("");
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "imu1jl9i");
      const data = await axios.post(
        "https://api.cloudinary.com/v1_1/dvfl7coan/image/upload",
        formData
      );

      const data2 = await axios.post("/api/posts/addPost", {
        description,
        img: data.data.secure_url,
      });
      dispatch(updatePost(data.data.secure_url));
    } catch (err) {
      console.log(err);
    }
  };

  const handleShare = async (e: any) => {
    e.preventDefault();
    try {
      if (file) await upload();
      setDescription("");
      setFile("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={user.profilePic} alt="" />
            <input
              className="input"
              type="text"
              value={description}
              placeholder={`What's on your mind ${user.name}?`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr className="hr" />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              name="file"
              multiple={false}
              accept="image/*"
              style={{ display: "none" }}
              className="input"
              onChange={(e: any) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Gallery} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};
