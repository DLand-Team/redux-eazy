import {
	createStorePro,
	flatInjectHookCreater,
	getActionTypeCreater,
	getDp,
	resetReduxHookCreater,
} from "redux-eazy";
import { stores } from "./stores";
declare global {
	interface Window {
		reduxStore: ReturnType<typeof createStorePro<typeof stores>>;
	}
}
// 前置基本
export const getActionType = getActionTypeCreater(stores);

export const reduxStore = window.reduxStore || createStorePro(stores);
window.reduxStore = reduxStore;
// 后置
/* Hooks */
export const useResetRedux = resetReduxHookCreater(stores);
export const useFlat = flatInjectHookCreater(stores, reduxStore);
/* utils */
export const dp = getDp(reduxStore, stores);
