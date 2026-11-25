import { configureStore } from "@reduxjs/toolkit";
import { setUnauthorizedHandler } from "@/api/axiosClient";
import { logoutUser } from "@/features/auth";
import { reducers } from "./features";

const store = configureStore({ reducer: reducers });

setUnauthorizedHandler(() => store.dispatch(logoutUser()));

export default store;
