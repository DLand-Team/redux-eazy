import {
	ActionCreatorWithPayload,
	AsyncThunk,
	AsyncThunkAction,
	EnhancedStore,
	Slice,
} from "@reduxjs/toolkit";
import { WatchType } from "./createStore";

export type UnParams<T> = T extends AsyncThunk<any, infer U, any>
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
			watch: WatchType;
			thunks: { [k in keyof S[key]["thunks"]]: S[key]["thunks"][k] };
			slice: Slice;
		};
	}
>(
	reduxStore: T,
	stores: S
) => {
	const dp = <
		T extends keyof typeof stores,
		K extends
			| keyof ((typeof stores)[T]["thunks"] &
					(typeof stores)[T]["slice"]["actions"])
			| "setState"
			| "reset"
	>(
		storeNameBase: T | [T, string],
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
			  >
	): K extends keyof (typeof stores)[T]["thunks"]
		? Promise<
				{
					payload: (typeof stores)[T]["thunks"][K] extends (
						arg: any
					) => AsyncThunkAction<infer U, any, any>
						? U
						: any;
				} & { error?: any }
		  >
		: void => {
		const [storeName, branchName] = Array.isArray(storeNameBase)
			? [`${storeNameBase[0] as string}`, storeNameBase[1]]
			: [storeNameBase as string, undefined];
		let thunk;
		if (Array.isArray(stores[storeName].slice)) {
			//@ts-ignore
			const thunksTemp = stores[storeName]["thunks"].find((item) => {
				if (!item.branchName && !branchName) {
					return true;
				}
				return item.branchName == branchName;
			});
			//@ts-ignore
			const actionsTemp = stores[storeName]["slice"].find((item) => {
				return item.branchName == branchName;
			})["actions"];
			//@ts-ignore
			thunk = { ...thunksTemp, ...actionsTemp }[actionName];
			//@ts-ignore
			if (typeof payload == "object" && "payload" in payload) {
				//@ts-ignore
				payload.branchName = storeNameBase[1];
			}
		} else {
			const thunks = {
				...stores[storeName]["thunks"],
				...stores[storeName]["slice"]["actions"],
			} as any;
			thunk = thunks[actionName];
		}
		return reduxStore.dispatch(thunk(payload)).then?.((res: any) => {
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
