import { ListenerMiddleware } from "redux-eazy";
import { dp, getActionType } from "@/service";
import { startAppListening } from "@/service/setup";

const watch = (listenerMiddleware: ListenerMiddleware) => {
	startAppListening({
		type: getActionType('appStore').setAppInfo,
		effect: () => {
			dp('authStore','setInfo','123')
		},
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
