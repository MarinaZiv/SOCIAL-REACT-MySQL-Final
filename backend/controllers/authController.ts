import { db } from "../db";
import { UserValidation } from "./userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = (req, res) => {
  const { username, email, password, name } = req.body;
  const { error } = UserValidation.validate({ email, password });
  if (error) throw error;
  const q = `SELECT * FROM users WHERE email='${email}' OR username='${username}'`;
  db.query(q, (err, data) => {
    try {
      if (err) throw err;
      if (data.length) {
        return res.status(403).send({ message: `${email} already exists` });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(password, salt);
        const q = `INSERT INTO users (username, email, password, name) VALUES ("${username}", "${email}", "${hashedPass}", "${name}")`;
        db.query(q, (err, result) => {
          try {
            if (err) throw err;
            res.status(200).send({
              success: true,
              massege: `${email} has been registered`,
              user: { username, email, name },
            });
          } catch (error) {
            console.error(error);
            res.status(500).send({ error: error.message });
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  });
};

export const login = (req, res) => {
  const { username, email, password } = req.body;
  const { error } = UserValidation.validate({ email, password });
  if (error) throw error;

  const q = `SELECT * FROM users WHERE email='${email}'`;
  db.query(q, (err, result) => {
    try {
      if (err) throw err;
      if (result.length === 0) throw new Error(`${email} not exists`);
      const { password, ...user } = result[0];
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        result[0].password
      );
      if (!isPasswordCorrect)
        throw new Error("username or password is incorrect");
      const secret = process.env.JWT_SECRET;
      const JWTCookie = jwt.sign(
        {
          id: result[0].id,
          username: result[0].username,
          email: result[0].email,
          name: result[0].name,
          profilePic: result[0].profilePic,
        },
        secret
      );

      res.cookie(
        "userCookie",
        JWTCookie,
        { httpOnly: true },
        { maxAge: 1000 * 60 * 60 * 12 }
      );
      res.send({ success: true, user });
    } catch (error) {
      console.error(error);
      res.send({ error: error.message });
    }
  });
};

export const getUserByCookie = (req, res) => {
  try {
    const { userCookie } = req.cookies;
    if (!userCookie) throw new Error("userCookie not found");
    const secret = process.env.JWT_SECRET;
    let decodedCookie = jwt.decode(userCookie, secret);
    res.send({ success: true, userCookie, decodedCookie });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res
      .clearCookie("userCookie", "value", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send({ message: "User has been logged out" });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
};
