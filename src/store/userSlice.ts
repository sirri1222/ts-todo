import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// 초기 값 타입 정의
export type LoginState = {
  userLogin: boolean;
  email: string;
  password: string;
};
// store 의 state 의 초기값 셋팅
const initialState: LoginState = {
  userLogin: false,
  email: "",
  password: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fbLoginState: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.userLogin = true;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    fbJoinState: (state) => {
      state.userLogin = false;
      state.email = "";
      state.password = "";
    },
    fbLogoutState: (state) => {
      state.userLogin = false;
      state.email = "";
      state.password = "";
    },
    fbDeleteUserState: (state) => {
      state.userLogin = false;
      state.email = "";
      state.password = "";
    },
  },
});

export const { fbLoginState, fbJoinState, fbLogoutState, fbDeleteUserState } =
  userSlice.actions;
export default userSlice.reducer;