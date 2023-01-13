import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import moonIcon from "../../assets/icon-moon.svg";
import sunIcon from "../../assets/icon-sun.svg";
import { selectUser, updateUser } from "../../userRedux/userSlice";
import { disabbleUser } from "../../userRedux/userSlice";
import axios from "axios";

interface NavbarProps {
  setTheme: Function;
  theme: string;
}

export const Navbar = ({ setTheme, theme }: NavbarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const toggleDarkMode = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleLogout = async () => {
    await axios.post("/api/auth/logout", { user });
    localStorage.removeItem("currentUser");
    localStorage.setItem("booleanCurrentUser", JSON.stringify(false));
    navigate("/");
    dispatch(disabbleUser());
  };

  useEffect(() => {
    dispatch(updateUser(user));
  }, [user.name]);

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="span">marinasocial</span>
        </Link>
        <HouseOutlinedIcon
          style={{ cursor: "pointer" }}
          onClick={handleGoHome}
        />
        {theme === "dark" ? (
          <img
            className="themeModeIcon"
            src={sunIcon}
            alt="icon"
            onClick={toggleDarkMode}
          />
        ) : (
          <img
            className="themeModeIcon"
            src={moonIcon}
            alt="icon"
            onClick={toggleDarkMode}
          />
        )}
        <GridViewOutlinedIcon style={{ cursor: "pointer" }} />
        <form className="search">
          <button type="submit">
            <SearchOutlinedIcon />
          </button>
          <input
            type="text"
            className="input"
            placeholder="Search..."
          />
        </form>
      </div>
      <div className="right">
        <PersonOutlinedIcon style={{ cursor: "pointer" }} />
        <EmailOutlinedIcon style={{ cursor: "pointer" }} />
        <NotificationsOutlinedIcon />
        <LogoutOutlinedIcon
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        />
        <div className="user">
          <Link to={`/profile/${user.id}`}>
            <img src={user.profilePic} alt="" />
          </Link>
          <Link to={`/profile/${user.id}`} style={{ textDecoration: "none" }}>
            <span className="name">{user.name}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
