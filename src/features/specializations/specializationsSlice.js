import createCrudSlice from "@/app/createCrudSlice";
import { specializationService } from "./api";

const { reducer, thunks } = createCrudSlice(
  "specializations",
  specializationService,
);

export const { fetchAll: fetchSpecializations } = thunks;
export const selectSpecializations = (state) => state.specializations;
export default reducer;
