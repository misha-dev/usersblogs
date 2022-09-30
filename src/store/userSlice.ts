import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserInterface } from "../interfaces/UserInterface";

type SelectedPosts = {
  selectedPosts: string;
};

const initialState: UserInterface = {
  uid: "",
  displayName: "",
  email: "",
  photoURL: "",
  // for an unauthorized user to view posts
  selectedPosts: "all",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: UserInterface, action: PayloadAction<UserInterface>) {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.selectedPosts = "all";
    },
    logOut(state: UserInterface) {
      return {} as UserInterface;
    },

    selectPosts(state: UserInterface, action: PayloadAction<SelectedPosts>) {
      state.selectedPosts = action.payload.selectedPosts;
    },
  },
});

export default user.reducer;
export const { setUser, logOut, selectPosts } = user.actions;
