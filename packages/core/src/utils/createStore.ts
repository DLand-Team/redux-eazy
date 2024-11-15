import {
	Action,
	ListenerMiddlewareInstance,
	Middleware,
	Reducer,
	ThunkDispatch,
	configureStore,
} from "@reduxjs/toolkit";
import { EnhancedStore } from "@reduxjs/toolkit";
import { listenerMiddleware, middlewares } from "../middleware";
import { getActionTypeCreater } from "./getActionType";
// import { reducerManager } from "./reducerManager";
type StoreSlices<T> = {
	[K in keyof T]: T[K] extends { slice: infer ST }
		? ST extends { reducer: infer D }
			? D
			: never
		: never;
};
export type WatchType = (
	branchName: string,
	listenerMiddleware: ListenerMiddlewareInstance<
		unknown,
		ThunkDispatch<unknown, unknown, Action>,
		unknown
	>,
	getActionType: any
) => void;
type Middlewares<S> = ReadonlyArray<Middleware<{}, S>>;
const createStore = <
	ST extends {
		[key in keyof ST]: ST[key];
	},
	M extends Middlewares<ST> = ReadonlyArray<Middleware<{}, ST>>
>(
	stores: ST,
	options?: {
		middleware?: {
			isLogger?: boolean;
			middlewareList?: M;
		};
	}
) => {
	const { middleware } = options || {};
	const { isLogger, middlewareList = [] } = middleware || {};
	const fn = <T>(
		key: keyof T,
		reducer: T,
		stores: {
			[k in keyof T]: {
				slice: {
					reducer: T[k];
				};
			};
		}
	) => {
		if (Array.isArray(stores[key].slice)) {
			(stores[key].slice as any).forEach((element) => {
				reducer[
					element.branchName
						? `${key as string}.${element.branchName}`
						: (key as string)
				] = element.reducer;
			});
		} else {
			reducer[key] = stores[key].slice.reducer;
		}
	};
	const reducer: StoreSlices<ST> = {} as StoreSlices<ST>;

	for (let key in stores) {
		const keys = key as keyof ST;
		fn(keys, reducer, stores);
	}

	const reduxStore = configureStore({
		reducer: reducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware().concat([
				...(isLogger ? middlewares : middlewares.slice(0, 1)),
				...(middlewareList ? middlewareList : []),
			]);
		},
	});
	listenerMiddleware.clearListeners();
	const getActionType = getActionTypeCreater(stores);
	// 注册监听
	Object.values<{
		slice: {
			reducer: any;
		};
		watch: WatchType;
	}>(stores).forEach((s) => {
		if (Array.isArray(s.slice)) {
			s.slice.forEach((item) => {
				s?.watch(item?.branchName, listenerMiddleware, getActionType);
			});
		} else {
			s?.watch("", listenerMiddleware, getActionType);
		}
	});

	type P2 = typeof reduxStore extends EnhancedStore<any, infer UU, any>
		? UU
		: never;
	type P3 = typeof reduxStore extends EnhancedStore<any, any, infer UUU>
		? UUU
		: never;

	return reduxStore as EnhancedStore<
		{
			[key in keyof ST]: StoreSlices<ST>[key] extends Reducer<
				infer SS,
				any
			>
				? SS
				: never;
		},
		P2,
		P3
	>;
};

export default createStore;
