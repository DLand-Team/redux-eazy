import { dp } from "../..";
import { createThunks } from "../../setup";
import slice from "./slice";
const thunks = createThunks(["appStore", slice.branch], {
	setTitleAct: async ({
		payload,
		branchName,
	}: {
		payload: string;
		branchName?: string;
	}) => {
		dp(["appStore", branchName!], "setTitle", payload);
	},
});
export default thunks;
