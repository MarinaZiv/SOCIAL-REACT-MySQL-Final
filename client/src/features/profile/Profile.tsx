import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useLocation } from "react-router-dom";
import { selectUser } from "../../userRedux/userSlice";
import { Posts } from "../../components/posts/Posts";
import { Update } from "../../components/update/Update";
import axios from "axios";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { BsWhatsapp } from "react-icons/bs";


export const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [postUser, setPostUser] = useState<{}>({});
  const [followerUserId, setFollowerUserId] = useState<number>();
  const [following, setFollowing] = useState<boolean>(true);
  const user = useAppSelector(selectUser);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/users/find/" + userId);
        setPostUser(data.postUser);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [userId]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `/api/relationships/getRelationships?followedUserId=${userId}`
        );

        for (let [key, value] of Object.entries(data.data[0])) {
          setFollowerUserId(parseInt(`${value}`));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [userId]);

  const handleFollow = async () => {
    setFollowing(!following);
    try {
      if (!following) {
        const { data } = await axios.post("/api/relationships/addRelationship", { userId });     
      }
      if (following) {
        const { data } = await axios.delete(
          `/api/relationships/deleteRelationship?userId=${userId}`
        );        
      }
    } catch (error) {
      console.error(error);
    }   
  };

  useEffect(() => {
    setPostUser(postUser);
  }, [user.id]);

  return (
    <div className="profile">
      <div className="images">
        <div className="border">
          {/* @ts-ignore */}
          <img src={postUser.coverPic} className="cover" alt="" />
        </div>
        {/* @ts-ignore */}
        <img src={postUser.profilePic} className="profilePic" alt="" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="medium" />
            </a>
            <a href="https://www.instagram.com/">
              <InstagramIcon fontSize="medium" />
            </a>
            <a href="https://twitter.com/">
              <TwitterIcon fontSize="medium" />
            </a>
            <a href="https://www.linkedin.com/">
              <LinkedInIcon fontSize="medium" />
            </a>
            <a href="https://www.pinterest.com/">
              <PinterestIcon fontSize="medium" />
            </a>
          </div>
          <div className="center">
            {/* @ts-ignore */}
            <span className="name">{postUser.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                {/* @ts-ignore */}
                <span>{postUser.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                {/* @ts-ignore */}
                <span>{postUser.website?.substring(0, 18)}</span>
              </div>
            </div>
            {userId === user.id ? (
              <button onClick={() => setOpenUpdate(true)}>update</button>
            ) : (
              <>
                {" "}
                {followerUserId === user.id && following === true ? (
                  <button
                    onClick={handleFollow}
                    style={{ backgroundColor: "seagreen" }}
                  >
                    Following
                  </button>
                ) : (
                  <button onClick={handleFollow}>Follow</button>
                )}
              </>
            )}
          </div>
          <div className="right">
            <a
              href="https://web.whatsapp.com//send?phone+972526501177" target="_bliank" >
              <BsWhatsapp />
            </a>
            <ForumOutlinedIcon />
            <a href="mailto:marinaziv4@gmail.com" target="_bliank">
              <EmailOutlinedIcon />
            </a>
            <MoreVertIcon />
          </div>
        </div>
        <Posts userId={userId} />
      </div>
      {openUpdate && (
        <Update setOpenUpdate={setOpenUpdate} postUser={postUser} />
      )}
    </div>
  );
};
