import { useEffect } from "react";
import "./styles/app.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Page404 } from "./features/404/404";
import { Login } from "./features/login/Login";
import { Register } from "./features/register/Register";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./features/home/Home";
import { Leftbar } from "./components/leftbar/Leftbar";
import { Rightbar } from "./components/rightbar/Rightbar";
import { Profile } from "./features/profile/Profile";
import { useAppDispatch } from "./app/hooks";
import { updateUser } from "./userRedux/userSlice";
import axios from "axios";
import useLocalStorage from "use-local-storage";

function App() {
  const dispatch = useAppDispatch();
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const getUserByCookie = async () => {
    try {
      const { data } = await axios.get("/api/auth/user-by-cookie");
      const { userCookie, decodedCookie } = data;
      if (!userCookie || !decodedCookie)
        throw new Error("userCookie not found");
      dispatch(updateUser(data.decodedCookie));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserByCookie();
  }, []);

  const Layout = () => {
    return (
      <div className="app" data-theme={theme}>
        <Navbar setTheme={setTheme} theme={theme} />
        <div style={{ display: "flex" }}>
          <Leftbar />
          <div className="home" data-theme={theme}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
          <Route index path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
