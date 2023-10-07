import {
  AnyAction,
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
  Dispatch,
} from '@reduxjs/toolkit';
import { getCreateThunkWithName } from './index';

const getCreateThunks = <
  ReduxState = any,
  ReduxDispatch extends Dispatch<AnyAction> = Dispatch<AnyAction>,
>() => {
  const createThunks = <
    S extends {
      [key in keyof S]: S[key];
    },
  >(
    name: string,
    obj: S
  ) => {
    const createThunkWithName = getCreateThunkWithName<ReduxState, ReduxDispatch>;
    const cteateThunk = createThunkWithName(name);
    let thunks = {} as {
      [key in keyof S]: AsyncThunk<
        S[key] extends AsyncThunkPayloadCreator<infer U, any, any> ? U : any,
        S[key] extends AsyncThunkPayloadCreator<any, infer UU, any> ? UU : any,
        S[key] extends AsyncThunkPayloadCreator<any, any, infer UUU> ? UUU : any
      >;
    };
    for (let key in obj) {
      cteateThunk(key, obj[key]);
      // @ts-ignore
      thunks[key] = cteateThunk(key, obj[key]);
    }
    return thunks;
  };
  return createThunks;
};

export default getCreateThunks;
