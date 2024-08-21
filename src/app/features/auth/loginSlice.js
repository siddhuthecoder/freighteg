// import { createSlice } from "@reduxjs/toolkit";

// export const loginSlice = createSlice({
//   name: "login",
//   initialState: { user: null, token: null },
//   reducers: {
//     setCredentials: (state, action) => {
//       const { user, token } = action.payload;
//       state.user = user;
//       state.token = token;
//     },
//     logOut: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setCredentials, logOut } = loginSlice.actions;

// export default loginSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: { user: null, token: null, status: false, bid_id: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.status = true;
      state.user = user;
      state.token = token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },

    logOut: (state) => {
      state.status = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logOut } = loginSlice.actions;

export default loginSlice.reducer;
