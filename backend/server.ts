import express from "express";
import authRoute from "./routes/authRoute";
import usersRoute from "./routes/usersRoute";
import postsRoute from "./routes/postsRoute";
import likesRoute from "./routes/likesRoute";
import commentsRoute from "./routes/commentsRoute";
import relationshipsRoute from "./routes/relationshipsRoute";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4076;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/likes", likesRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/relationships", relationshipsRoute);

app.use((req, res, next) => {
  //@ts-ignore
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);


app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port} `);
});