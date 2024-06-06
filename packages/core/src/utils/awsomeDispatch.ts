import {
	ActionCreatorWithPayload,
	AnyAction,
	AsyncThunk,
	AsyncThunkAction,
	ListenerMiddlewareInstance,
	Slice,
	ThunkDispatch,
} from "@reduxjs/toolkit";
import { EnhancedStore } from "@reduxjs/toolkit/dist/configureStore";

export type UnParams<T> =
	T extends AsyncThunk<any, infer U, any>
		? U
		: T extends ActionCreatorWithPayload<infer Z, any>
			? Z
			: T extends (...args: any) => any
				? Parameters<T>[0]
				: any;

export const getDp = <
	T extends EnhancedStore,
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
		K extends
			| keyof ((typeof stores)[T]["thunks"] &
					(typeof stores)[T]["slice"]["actions"])
			| "setState"
			| "reset",
	>(
		storeName: T,
		actionName: K,
		payload?: K extends "setState"
			? S[T]["slice"] extends Slice<infer U, any, any>
				? Partial<U>
				: any
			: UnParams<
					K extends keyof (typeof stores)[T]["slice"]["actions"]
						? (typeof stores)[T]["slice"]["actions"][K]
						: K extends keyof (typeof stores)[T]["thunks"]
							? (typeof stores)[T]["thunks"][K]
							: any
				>,
	): K extends keyof (typeof stores)[T]["thunks"]
		? Promise<
				{
					payload: (typeof stores)[T]["thunks"][K] extends (
						arg: any,
					) => AsyncThunkAction<infer U, any, any>
						? U
						: any;
				} & { error?: any }
			>
		: void => {
		const thunks = {
			...stores[storeName]["thunks"],
			...stores[storeName]["slice"]["actions"],
		} as any;
		return reduxStore
			.dispatch(thunks[actionName](payload))
			.then?.((res: any) => {
				if (res.error) {
					let error = new Error(res.error.message);
					error.stack = res.error.stack;
					error.name = res.error.name;
					error.message = res.error.message;
					throw error;
				} else {
					return res;
				}
			});
	};
	return dp;
};
