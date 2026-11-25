import createCrudSlice from "@/app/createCrudSlice";
import { userService } from "./api";

const { reducer, thunks } = createCrudSlice("users", userService);

export const {
  fetchAll: fetchUsers,
  create: createUser,
  update: updateUser,
  remove: deleteUser,
} = thunks;
export const selectUsers = (state) => state.users;
export default reducer;
