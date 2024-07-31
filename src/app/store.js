// import { configureStore } from "@reduxjs/toolkit";
// import loginSlice from "./features/auth/loginSlice";
// export const store = configureStore({
//   reducer: {
//     login: loginSlice,
//   },
// });
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/auth/loginSlice";

const loadState = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      return {
        login: {
          user: user,
          token: token,
          status: true,
        },
      };
    }
  } catch (err) {
    console.error("Could not load state from localStorage", err);
  }
  return undefined;
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
  preloadedState,
});
