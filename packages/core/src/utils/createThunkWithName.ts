/* Core */
import {
	Action,
	AsyncThunkOptions,
	Dispatch,
	PayloadAction,
	createAsyncThunk,
} from "@reduxjs/toolkit";
import { AsyncThunkPayloadCreator } from "./overwriteReudx";

/* Instruments */
declare type AsyncThunkConfig = {
	state?: unknown;
	dispatch?: Dispatch;
	extra?: unknown;
	rejectValue?: unknown;
	serializedErrorType?: unknown;
	pendingMeta?: unknown;
	fulfilledMeta?: unknown;
	rejectedMeta?: unknown;
};

export const getCreateThunkWithName = <
	ReduxState extends any,
	ReduxDispatch extends Dispatch<Action>
>(
	sliceName: string,
	branchName: string = ""
) => {
	debugger;
	return <
		ThunkArg = void,
		Returned = void,
		ThunkApiConfig extends AsyncThunkConfig = any
	>(
		name: string,
		creater: AsyncThunkPayloadCreator<
			Returned,
			ThunkArg,
			{
				state: ReduxState;
				dispatch: Dispatch<PayloadAction<any>>;
				rejectValue: string;
				extra?: unknown;
				serializedErrorType?: unknown
				pendingMeta?: unknown;
				fulfilledMeta?: unknown;
				rejectedMeta?: unknown;
			}
		>,
		options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>
	) => {
		return createAsyncThunk.withTypes<{
			state: ReduxState;
			dispatch: ReduxDispatch;
			rejectValue: string;
		}>()(
			`${sliceName}/${name}`,
			(...arg) => {
				//@ts-ignore
				return creater(...arg, branchName);
			},
			options as any
		);
	};
};
