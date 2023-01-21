import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserRegister } from '../models/userInterface'
import axios from "axios";


export const registerAsync = createAsyncThunk(
  "/api/user/register",
  async ({ username, email, password, name }: UserRegister) => {
    try {
      const response = await axios.post("/api/auth/register", {
        username,
        email,
        password,
        name,
      });

      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
