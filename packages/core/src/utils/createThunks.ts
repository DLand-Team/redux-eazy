import { Action, AsyncThunk, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { getCreateThunkWithName } from "./index";
import { AsyncThunkPayloadCreator, GetThunkAPI } from "./overwriteReudx";
// import { BaseThunkAPI } from "./overwriteReudx";

const getCreateThunks = <
	ReduxState = any,
	ReduxDispatch extends Dispatch<Action> = Dispatch<Action>
>() => {
	const createThunks = <
		S extends {
			[key in keyof S]: (
				arg: typeof cteateThunk extends AsyncThunkPayloadCreator<
					any,
					infer U,
					any
				>
					? U
					: any,
				api: GetThunkAPI<{
					state: ReduxState;
					dispatch: Dispatch<PayloadAction<any>>;
					rejectValue: string;
					extra?: unknown;
					serializedErrorType?: unknown;
					pendingMeta?: unknown;
					fulfilledMeta?: unknown;
					rejectedMeta?: unknown;
				}>,
				branch?: string
			) => any;
		}
	>(
		name: keyof ReduxState | [keyof ReduxState, string[] | undefined],
		obj: S
	) => {
		const createThunkWithName = getCreateThunkWithName<
			ReduxState,
			ReduxDispatch
		>;
		let thunks = {} as {
			[key in keyof S]: AsyncThunk<
				S[key] extends AsyncThunkPayloadCreator<infer U, any, any>
					? U
					: any,
				S[key] extends AsyncThunkPayloadCreator<any, infer UU, any>
					? UU
					: any,
				S[key] extends AsyncThunkPayloadCreator<any, any, infer UUU>
					? UUU
					: any
			>;
		};
		const cteateThunk = createThunkWithName(name as string);
		if (Array.isArray(name)) {
			if (name[1]?.length) {
				name[1].unshift("");
				//@ts-ignore
				thunks = name[1].map((item) => {
					const thunksTemp = {};
					const branchName = item;
					for (let key in obj) {
						const cteateThunk = createThunkWithName(
							`${name[0] as string}${
								branchName ? "." + branchName : ""
							}` as string,
							item
						);
						// @ts-ignore
						thunksTemp[key] = cteateThunk(key, obj[key]);
					}
					//@ts-ignore
					thunksTemp.branchName = branchName;
					return thunksTemp;
				});
			} else {
				for (let key in obj) {
					const cteateThunk = createThunkWithName(name[0] as string);
					// @ts-ignore
					thunks[key] = cteateThunk(key, obj[key]);
				}
			}
		} else {
			for (let key in obj) {
				const cteateThunk = createThunkWithName(name as string);
				// @ts-ignore
				thunks[key] = cteateThunk(key, obj[key]);
			}
		}

		return thunks;
	};
	return createThunks;
};

export default getCreateThunks;
