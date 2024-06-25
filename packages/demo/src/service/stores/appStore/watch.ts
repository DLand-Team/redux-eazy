import { getActionType } from "../..";
import { startAppListening } from "../../setup";

const watch = (branchName: string) => {
	let a = getActionType(["appStore", branchName]).setTitle;
	debugger;
	startAppListening({
		type: a,
		effect: async () => {
			console.log(123);
		},
	});
	// startAppListening({
	// 		return action.type == `${getActionType("appStore").setPagination}`;
	// 	}),
	// 	effect: async () => {
	// 		dp("appStore", "queryAct");
	// 	},
	// });
};

export default watch;
