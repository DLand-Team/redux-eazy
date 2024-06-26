import { dp, dpChain } from "../..";
import { createThunks } from "../../setup";
const thunks = createThunks("otherStore", {
	setTitleAct: async (a, api) => {
		dp("otherStore", "setTitle", a);
	},
	setTitleActA: async () => {
		return {
			a: 1,
		};
	},
});
export default thunks;
