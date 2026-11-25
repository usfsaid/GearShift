//fun on people
import createCrudSlice from "@/app/createCrudSlice";

import { peopleService } from "./api";

const { reducer, thunks } = createCrudSlice("people", peopleService);

export const {
  fetchAll: fetchPeople,
  create: createPerson,
  update: updatePerson,
  remove: deletePerson,
} = thunks;
export const selectPeople = (state) => state.people;
export default reducer;
