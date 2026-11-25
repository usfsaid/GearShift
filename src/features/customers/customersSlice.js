import createCrudSlice from "@/app/createCrudSlice";
import { customerService } from "./api";

const { reducer, thunks } = createCrudSlice("customers", customerService);

export const { fetchAll: fetchCustomers } = thunks;
export const selectCustomers = (state) => state.customers;
export default reducer;
