import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../interfaces/UserInterface";

type UserState = {
  user: UserInterface;
};
type SelectedPosts = {
  selectedPosts: string;
};

const initialState: UserState = {
  user: {
    // for an unauthorized user to view posts
    selectedPosts: "all",
  } as UserInterface,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<UserInterface>) {
      state.user.uid = action.payload.uid;
      state.user.displayName = action.payload.displayName;
      state.user.email = action.payload.email;
      state.user.photoURL = action.payload.photoURL;
      state.user.selectedPosts = "all";
    },
    logOut(state: UserState) {
      state.user = {} as UserInterface;
    },

    selectPosts(state: UserState, action: PayloadAction<SelectedPosts>) {
      state.user.selectedPosts = action.payload.selectedPosts;
    },
  },
});

export default user.reducer;
export const { setUser, logOut, selectPosts } = user.actions;
