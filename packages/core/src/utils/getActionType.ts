import {
	AnyAction,
	AsyncThunk,
	ListenerMiddlewareInstance,
	Slice,
	ThunkDispatch,
} from "@reduxjs/toolkit";
import { EnhancedStore } from "@reduxjs/toolkit";

export const getActionTypeCreater = <
	ReduxStore extends EnhancedStore,
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
>(
	stores: S,
) => {
	type Slices = S;
	type Pick<T, K extends keyof T> = {
		[P in K]: T[P];
	};
	let b: {
		[key in keyof Slices]: {
			[key2 in keyof (Slices[key]["slice"]["actions"] &
				Slices[key]["thunks"])]: string;
		};
	} = {} as {
		[key in keyof Slices]: {
			[key2 in keyof (Slices[key]["slice"]["actions"] &
				Slices[key]["thunks"])]: string;
		};
	};

	function getActionType<SliceName extends keyof Slices>(
		sliceName: SliceName,
	): Pick<typeof b, SliceName>[SliceName] {
		let tempB: Partial<{
			[key in keyof Slices]: Partial<{
				[key2 in keyof (Slices[key]["slice"]["actions"] &
					Slices[key]["thunks"])]: string;
			}>;
		}> = b;
		Object.entries<{
			watch: (
				listenerMiddleware: ListenerMiddlewareInstance<
					unknown,
					ThunkDispatch<unknown, unknown, AnyAction>,
					unknown
				>,
			) => void;
			thunks: { [k: string]: AsyncThunk<any, any, any> };
			slice: Slice;
		}>(stores).forEach(([key, value]) => {
			Object.keys({ ...value.thunks, ...value.slice.actions }).forEach(
				(keyItem) => {
					if (!b[key as keyof Slices]) {
						//@ts-ignore
						tempB[key as keyof Slices] = {
							[keyItem]: `${key}/${keyItem}`,
						};
					} else {
						// 这种可以
						tempB[key as keyof Slices] = {
							...b[key as keyof Slices],
							[keyItem]: `${key}/${keyItem}`,
						};
					}
				},
			);
		});
		return (
			//@ts-ignore
			{
				[sliceName]: (tempB as typeof b)[sliceName],
			}[sliceName] || ""
		);
	}
	return getActionType;
};
