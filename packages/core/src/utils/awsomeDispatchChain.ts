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
	: undefined;

export const getDpChain = <
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
	const dp = <T extends keyof typeof stores>(
		storeNameBase: T | [T, string]
	): {
		[key2 in keyof ((typeof stores)[T]["thunks"] &
			(typeof stores)[T]["slice"]["actions"])]: key2 extends keyof (typeof stores)[T]["thunks"]
			? NonNullable<UnParams<(typeof stores)[T]["thunks"][key2]>> extends
					| undefined
					| null
				? () => key2 extends keyof (typeof stores)[T]["thunks"]
						? Promise<
								{
									payload: (typeof stores)[T]["thunks"][key2] extends (
										arg: any
									) => AsyncThunkAction<infer U, any, any>
										? U
										: any;
								} & { error?: any }
						  >
						: void
				: (
						payload: key2 extends "setState"
							? S[T]["slice"] extends Slice<infer U, any, any>
								? Partial<U>
								: any
							: UnParams<
									key2 extends keyof (typeof stores)[T]["slice"]["actions"]
										? (typeof stores)[T]["slice"]["actions"][key2]
										: any
							  >
				  ) => key2 extends keyof (typeof stores)[T]["thunks"]
						? Promise<
								{
									payload: (typeof stores)[T]["thunks"][key2] extends (
										arg: any
									) => AsyncThunkAction<infer U, any, any>
										? U
										: any;
								} & { error?: any }
						  >
						: void
			: (
					payload: key2 extends "setState"
						? S[T]["slice"] extends Slice<infer U, any, any>
							? Partial<U>
							: any
						: UnParams<
								key2 extends keyof (typeof stores)[T]["slice"]["actions"]
									? (typeof stores)[T]["slice"]["actions"][key2]
									: any
						  >
			  ) => key2 extends keyof (typeof stores)[T]["thunks"]
					? Promise<
							{
								payload: (typeof stores)[T]["thunks"][key2] extends (
									arg: any
								) => AsyncThunkAction<infer U, any, any>
									? U
									: any;
							} & { error?: any }
					  >
					: void;
	} => {
		const [storeName, branchName] = Array.isArray(storeNameBase)
			? [`${storeNameBase[0] as string}`, storeNameBase[1]]
			: [storeNameBase as string, undefined];

		let actMap;
		if (Array.isArray(stores[storeName].slice)) {
			const thunksTemp = Array.isArray(stores[storeName]["thunks"])
				? //@ts-ignore
				  stores[storeName]["thunks"].find((item) => {
						if (!item.branchName && !branchName) {
							return true;
						}
						return item.branchName == branchName;
				  })
				: stores[storeName]["thunks"];
			//@ts-ignore
			const actionsTemp = stores[storeName]["slice"].find((item) => {
				return item.branchName == branchName;
			})["actions"];
			//@ts-ignore
			actMap = { ...thunksTemp, ...actionsTemp };
			//@ts-ignore
			if (typeof payload == "object" && "payload" in payload) {
				//@ts-ignore
				payload.branchName = branchName;
			}
		} else {
			actMap = {
				...stores[storeName]["thunks"],
				...stores[storeName]["slice"]["actions"],
			} as any;
		}

		for (let actKey in actMap) {
			const act = actMap[actKey];
			actMap[actKey] = (payload) => {
				return reduxStore.dispatch(act(payload)).then?.((res: any) => {
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
		}
		return actMap;
	};

	return dp;
};
