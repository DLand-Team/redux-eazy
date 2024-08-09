import { dpChain } from "../..";
import { createThunks } from "../../setup";
const thunks = createThunks("otherStore", {
	setTitleAct: async (a: string, api) => {
		dpChain("otherStore").setTitle(a);
	},
	testAct: async () => {
		return {
			a: 1,
		};
	},
});
export default thunks;
