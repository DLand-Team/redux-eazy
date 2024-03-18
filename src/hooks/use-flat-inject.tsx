import {
	AnyAction,
	AsyncThunk,
	AsyncThunkAction,
	ListenerMiddlewareInstance,
	Slice,
	ThunkDispatch,
} from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { useMemo } from "react";
import useAppSelector from "./use-app-selector";

export type PromiseType<T> = Promise<T>;
export type UnPromisify<T> = T extends PromiseType<infer U> ? U : never;
export type UnPayload<T> = T extends (
	arg: any,
) => AsyncThunkAction<infer U, any, any>
	? U
	: never;
export type UnPayload2<T> = T extends (
	arg: any,
) => AsyncThunk<infer U, any, any>
	? U
	: never;
export type UnReturn<T> = T extends (
	arg: any,
) => AsyncThunkAction<any, any, any>
	? ReturnType<T>
	: never;

export type UnReturn2<T> = T extends (arg: any) => AsyncThunk<any, any, any>
	? ReturnType<T>
	: never;

const flatInjectHookCreater = <
	S extends {
		[key in keyof ReturnType<ReduxStore["getState"]>]: {
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
	ReduxStore extends ToolkitStore,
>(
	stores: S,
	reduxStore: ReduxStore,
) => {
	type FlatStore<T extends keyof ReturnType<ReduxStore["getState"]>> = {
		slices: S[T]["slice"];
	} & S[T]["slice"]["actions"] & {
			[K in keyof S[T]["thunks"]]: (
				payload?: Parameters<S[T]["thunks"][K]> extends any[]
					? Parameters<S[T]["thunks"][K]>[0]
					: undefined,
			) => Promise<
				UnPromisify<ReturnType<UnReturn<S[T]["thunks"][K]>>> & {
					payload: UnPayload<S[T]["thunks"][K]>;
				} & { error?: any }
			>;
		} & ReturnType<ReduxStore["getState"]>[T];

	const useFlatInject = <T extends keyof ReturnType<ReduxStore["getState"]>>(
		storeName: T,
	) => {
		const storeState = useAppSelector<ReturnType<ReduxStore["getState"]>>()(
			(state) => {
				return state[storeName];
			},
		);
		return useMemo<FlatStore<T>>(() => {
			const { thunks, slice } = stores[storeName];
			let sliceTemp = slice;
			let thunkArr = {};
			let actionArr = {};
			for (let key in sliceTemp.actions) {
				let act = sliceTemp.actions[
					key as keyof typeof sliceTemp.actions
				] as any;
				actionArr = {
					...actionArr,
					[key]: (payload: never) => {
						return reduxStore.dispatch(act(payload));
					},
				};
			}
			for (let key in thunks) {
				let thk = thunks[key as keyof typeof thunks] as any;

				thunkArr = {
					...thunkArr,
					[key]: (payload: never) => {
						return reduxStore
							.dispatch(thk(payload))
							.then((res: any) => {
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
					},
				};
			}
			return {
				slices: sliceTemp,
				...storeState,
				...thunkArr,
				...actionArr,
			} as any;
		}, [storeState]);
	};
	return useFlatInject;
};

export default flatInjectHookCreater;
