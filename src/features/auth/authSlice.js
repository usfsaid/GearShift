import { createSlice } from "@reduxjs/toolkit";
import createApiThunk from "@/app/createApiThunk";
import { authService } from "./api";
import { clearToken, getToken, setToken } from "@/utils/storage";

// status: idle (signed out) | loading (restoring session) | ready (signed in)
const initialState = { user: null, status: getToken() ? "loading" : "idle" };

export const login = createApiThunk("auth/login", async (credentials) => {
  const { token, user } = await authService.login(credentials);
  setToken(token);
  return user;
});

export const fetchCurrentUser = createApiThunk("auth/me", async () => {
  try {
    return await authService.me();
  } catch (error) {
    clearToken();
    throw error;
  }
});

export const logoutUser = createApiThunk("auth/logout", async () => {
  clearToken();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "ready";
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "ready";
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.status = "idle";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      });
  },
});

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
