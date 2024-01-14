import {
	ActionCreatorWithPayload,
	AnyAction,
	AsyncThunk,
	ListenerMiddlewareInstance,
	Slice,
	ThunkDispatch,
} from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

export type UnParams<T> = T extends AsyncThunk<any, infer U, any>
	? U
	: T extends ActionCreatorWithPayload<infer Z, any>
	? Z
	: T extends (...args: any) => any
	? Parameters<T>[0]
	: any;

export const getDp = <
	T extends ToolkitStore,
	S extends {
		[key in keyof ReturnType<T["getState"]>]: {
			watch: (
				listenerMiddleware: ListenerMiddlewareInstance<
					unknown,
					ThunkDispatch<unknown, unknown, AnyAction>,
					unknown
				>,
			) => void;
			thunks: { [k in keyof S[key]["thunks"]]: S[key]["thunks"][k] };
			slice: Slice;
		};
	},
>(
	reduxStore: T,
	stores: S,
) => {
	const dp = <
		T extends keyof typeof stores,
		K extends keyof ((typeof stores)[T]["thunks"] &
			(typeof stores)[T]["slice"]["actions"]),
	>(
		storeName: T,
		actionName: K,
		payload?: UnParams<
			K extends keyof (typeof stores)[T]["slice"]["actions"]
				? (typeof stores)[T]["slice"]["actions"][K]
				: K extends keyof (typeof stores)[T]["thunks"]
				? (typeof stores)[T]["thunks"][K]
				: any
		>,
	) => {
		const thunks = {
			...stores[storeName]["thunks"],
			...stores[storeName]["slice"]["actions"],
		} as any;
		reduxStore.dispatch(thunks[actionName](payload || {}));
	};
	return dp;
};
