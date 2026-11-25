import { createSlice } from "@reduxjs/toolkit";
import createApiThunk from "./createApiThunk";

// all fun
export default function createCrudSlice(name, service) {
  const fetchAll = createApiThunk(`${name}/fetchAll`, () => service.getAll());

  //create
  const create = createApiThunk(
    `${name}/create`,
    async (payload, { dispatch }) => {
      const created = await service.create(payload);
      await dispatch(fetchAll());
      return created;
    },
  );

  //update
  const update = createApiThunk(
    `${name}/update`,
    async ({ id, payload }, { dispatch }) => {
      const updated = await service.update(id, payload);
      await dispatch(fetchAll());
      return updated;
    },
  );

  //remove
  const remove = createApiThunk(`${name}/remove`, async (id, { dispatch }) => {
    await service.remove(id);
    await dispatch(fetchAll());
  });

  const slice = createSlice({
    name,
    initialState: { items: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAll.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchAll.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.items = action.payload;
        })
        .addCase(fetchAll.rejected, (state) => {
          state.status = "failed";
        });
    },
  });

  return {
    reducer: slice.reducer,
    thunks: { fetchAll, create, update, remove },
  };
}
