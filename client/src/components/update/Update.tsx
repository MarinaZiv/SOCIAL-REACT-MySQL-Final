import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

interface UpdateProps {
  setOpenUpdate: Function;
  postUser: Object;
}

export const Update = ({ setOpenUpdate, postUser }: UpdateProps) => {
  const [profile, setProfile] = useState<any>();
  const [profileUser, setProfileUser] = useState({
    // @ts-ignore
    email: postUser.email,
    // @ts-ignore
    name: postUser.name,
    // @ts-ignore
    city: postUser.city,
    // @ts-ignore
    website: postUser.website,
  });

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", profile);
      formData.append("upload_preset", "imu1jl9i");
      const data1 = await axios.post(
        "https://api.cloudinary.com/v1_1/dvfl7coan/image/upload",
        formData
      );

      const data2 = await axios.patch("/api/users/updateUser", {
        ...profileUser,
        profilePic: data1.data.secure_url,
        postUser,
      });
      setProfile(data1.data.secure_url);   
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    try {     
      if (profile) await upload();      
      setOpenUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.FormEvent<Element> | any) => {
    setProfileUser((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form onSubmit={handleUpdate}>
          <div className="files">
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img src={profile && URL.createObjectURL(profile)} alt="" />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              multiple={false}
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e: any) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profileUser.email}
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profileUser.name}
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={profileUser.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={profileUser.website}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};
