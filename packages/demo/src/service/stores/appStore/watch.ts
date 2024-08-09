import { getActionType } from "../..";
import { startAppListening } from "../../setup";

const watch = (branchName: string) => {
	const { setTitleAct } = getActionType(["appStore", branchName]);
	startAppListening({
		type: getActionType(["appStore", branchName]).setTitle,
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
