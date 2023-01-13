import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../userRedux/userSlice";
import postsReducer from "../components/posts/postsSlice";
import commentsReducer from "../components/comments/commentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
