import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("bcix_auth") ? true : false,
  userType: localStorage.getItem("bcix_userType"),
  userRole: localStorage.getItem("bcix_userRole"),
  profileURL: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth_login: (state, action) => {
      localStorage.setItem("bcix_auth", action.payload.token);
      localStorage.setItem("bcix_userType", action.payload.userType);
      localStorage.setItem("bcix_userRole", action.payload.userRole);
      localStorage.setItem("bcix_userId", action.payload.userId);
      localStorage.setItem("bcix_userName", action.payload.userName);
      localStorage.setItem("bcix_profileURL", action.payload.profileURL);
      localStorage.setItem(
        "bcix_organizationID",
        action.payload.organizationID
      );
      state.isLoggedIn = true;
      state.userType = action.payload.userType;
      state.userRole = action.payload.userRole;
      state.profileURL = action.payload.profileURL;
    },
    auth_logout: (state) => {
      localStorage.removeItem("bcix_auth");
      localStorage.removeItem("bcix_userType");
      localStorage.removeItem("bcix_organizationID");
      localStorage.removeItem("bcix_userName");
      localStorage.removeItem("bcix_userRole");
      localStorage.removeItem("bcix_userId");
      localStorage.removeItem("bcix_profileURL");
      state.isLoggedIn = false;
      state.userType = null;
      state.userRole = null;
    },
    update_profile: (state, action) => {
      localStorage.setItem("bcix_profileURL", action.payload.profileURL);
      state.profileURL = action.payload.profileURL;
    },
  },
});

export const { auth_login, auth_logout, update_profile } = slice.actions;
export default slice.reducer;
