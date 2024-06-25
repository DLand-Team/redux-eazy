import { AsyncThunk, EnhancedStore, Slice } from "@reduxjs/toolkit";
import { WatchType } from "./createStore";

export const getActionTypeCreater = <
	ReduxStore extends EnhancedStore,
	S extends {
		[key in keyof ReturnType<ReduxStore["getState"]>]: {
			watch: WatchType;
			thunks: { [k in keyof S[key]["thunks"]]: S[key]["thunks"][k] };
			slice: Slice;
		};
	}
>(
	stores: S
) => {
	type Slices = S;
	type Pick<T, K extends keyof T> = {
		[P in K]: T[P];
	};
	let b: {
		[key in keyof Slices]: {
			[key2 in keyof Slices[key]["slice"]["actions"]]: string;
		} & {
			[key2 in keyof Slices[key]["thunks"]]: {
				pending: string;
				fulfilled: string;
				rejected: string;
			};
		};
	} = {} as {
		[key in keyof Slices]: {
			[key2 in keyof Slices[key]["slice"]["actions"]]: string;
		} & {
			[key2 in keyof Slices[key]["thunks"]]: {
				pending: string;
				fulfilled: string;
				rejected: string;
			};
		};
	};
	function getActionType<SliceName extends keyof Slices>(
		sliceNameBase: SliceName | [SliceName, string]
	): Pick<typeof b, SliceName>[SliceName] {
		const [sliceName, subName] = Array.isArray(sliceNameBase)
			? sliceNameBase
			: [sliceNameBase];
		let tempB: Partial<{
			[key in keyof Slices]: Partial<
				{
					[key2 in keyof Slices[key]["slice"]["actions"]]: string;
				} & {
					[key2 in keyof Slices[key]["thunks"]]: {
						pending: string;
						fulfilled: string;
						rejected: string;
					};
				}
			>;
		}> = b;
		Object.entries<{
			watch: WatchType;
			thunks: { [k: string]: AsyncThunk<any, any, any> };
			slice: Slice;
		}>(stores).forEach(([keyBase, value]) => {
			const key = subName ? `${keyBase}.${subName}` : keyBase;
			const slice = Array.isArray(value.slice)
				? value.slice[0]
				: value.slice;

			Object.keys({ ...slice.actions }).forEach((keyItem) => {
				if (!b[key as keyof Slices]) {
					//@ts-ignore
					tempB[key as keyof Slices] = {
						[keyItem]: `${key}/${keyItem}`,
					};
				} else {
					tempB[key as keyof Slices] = {
						...b[key as keyof Slices],
						[keyItem]: `${key}/${keyItem}`,
					};
				}
			});
			Object.keys({ ...value.thunks }).forEach((keyItem) => {
				if (!b[key as keyof Slices]) {
					//@ts-ignore
					tempB[key as keyof Slices] = {
						[keyItem]: {
							pending: `${key}/${keyItem}/pending`,
							fulfilled: `${key}/${keyItem}/fulfilled`,
							rejected: `${key}/${keyItem}/rejected`,
						},
					};
				} else {
					// 这种可以
					tempB[key as keyof Slices] = {
						...b[key as keyof Slices],
						[keyItem]: {
							pending: `${key}/${keyItem}/pending`,
							fulfilled: `${key}/${keyItem}/fulfilled`,
							rejected: `${key}/${keyItem}/rejected`,
						},
					};
				}
			});
		});
		return (
			//@ts-ignore
			{
				[sliceName]: (tempB as typeof b)[
					subName
						? `${sliceName as string}.${subName as string}`
						: (sliceName as string)
				],
			}[sliceName] || ""
		);
	}
	return getActionType;
};
