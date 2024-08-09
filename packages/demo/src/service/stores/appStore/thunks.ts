import { dp, dpChain } from "../..";
import { createThunks } from "../../setup";
import slice from "./slice";
const thunks = createThunks(["appStore", slice.branch], {
	setTitleAct: (payload, api, branchName) => {
		dp(["appStore", branchName], "setTitle", payload);
	},
	testAct() {
		return {
			a: 1,
		};
	},
});
export default thunks;
