import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseApiError } from "@/utils/errors";

// Async thunk whose rejection payload is always { code, params }
export default function createApiThunk(type, handler) {
  return createAsyncThunk(type, async (arg, thunkApi) => {
    try {
      return await handler(arg, thunkApi);
    } catch (error) {
      return thunkApi.rejectWithValue(parseApiError(error));
    }
  });
}
