import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  selectedPosts?: string;
};

type UserState = {
  user: User;
};
type SelectedPosts = {
  selectedPosts: string;
};

const initialState: UserState = {
  user: {
    // for an unauthorized user to view posts
    selectedPosts: "all",
  } as User,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<User>) {
      state.user.uid = action.payload.uid;
      state.user.displayName = action.payload.displayName;
      state.user.email = action.payload.email;
      state.user.photoURL = action.payload.photoURL;
      state.user.selectedPosts = "all";
    },
    logOut(state: UserState) {
      state.user = {} as User;
    },

    selectPosts(state: UserState, action: PayloadAction<SelectedPosts>) {
      state.user.selectedPosts = action.payload.selectedPosts;
    },
  },
});

export default user.reducer;
export const { setUser, logOut, selectPosts } = user.actions;
