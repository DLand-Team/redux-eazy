import { dp } from "../..";
import { createThunks } from "../../setup";
import slice from "./slice";
const thunks = createThunks(["appStore", slice.branch], {
	setTitleAct: async (a: string, api, b) => {
		dp(["appStore", branchName!], "setTitle", payload);
		return { a: 1 };
	},
});
export default thunks;
