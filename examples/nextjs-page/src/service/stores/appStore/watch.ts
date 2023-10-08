import { ListenerMiddleware } from "redux-eazy";
import { getActionType } from "@/service";
import { startAppListening } from "@/service/setup";

const watch = (listenerMiddleware: ListenerMiddleware) => {
	startAppListening({
		type: getActionType('appStore').setAppInfo,
		effect: () => {},
	});
	// 监听例子
	listenerMiddleware.startListening({
		predicate: (action, currentState, previousState) => {
			return false;
		},
		effect: async (action, listenerApi) => {},
	});
};

export default watch;
