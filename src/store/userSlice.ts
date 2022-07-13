import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

type UserState = {
  user: User;
};

const initialState: UserState = {
  user: {} as User,
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
    },
  },
});

export default user.reducer;
export const { setUser } = user.actions;
