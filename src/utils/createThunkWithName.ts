/* Core */
import {
  AnyAction,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
  Dispatch,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

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

export const getCreateThunkWithName = <ReduxState, ReduxDispatch extends Dispatch<AnyAction>>(
  sliceName: string
) => {
  return <ThunkArg = void, Returned = void, ThunkApiConfig extends AsyncThunkConfig = {}>(
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
    }>()(`${sliceName}/${name}`, creater, options);
  };
};
