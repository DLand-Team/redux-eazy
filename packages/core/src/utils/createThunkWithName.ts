/* Core */
import {
	Action,
	AsyncThunkOptions,
	AsyncThunkPayloadCreator,
	Dispatch,
	PayloadAction,
	createAsyncThunk,
} from "@reduxjs/toolkit";

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
	sliceName: string
) => {
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
				serializedErrorType?: unknown;
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
		}>()(`${sliceName}/${name}`, creater, options as any);
	};
};
