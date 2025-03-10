import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../auth/KeycloakProvider.tsx";

interface AuthState {
  isAuth: boolean;
  user: IUser | undefined;
}

const initialState: AuthState = {
  isAuth: false,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth(state, actions: PayloadAction<boolean>) {
      state.isAuth = actions.payload;
    },
    setUser(state, actions: PayloadAction<IUser>) {
      state.user = actions.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.user = undefined;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
