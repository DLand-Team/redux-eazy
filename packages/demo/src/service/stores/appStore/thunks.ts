import { dp } from "../..";
import { createThunks } from "../../setup";
import slice from "./slice";
const thunks = createThunks(["appStore", slice.branch], {
	setTitleAct: async (payload: string, api, branchName) => {
		dp(["appStore", branchName!], "setTitle", payload);
		return { a: 1 };
	},
});
export default thunks;
