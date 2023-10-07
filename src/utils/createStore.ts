import {
  AnyAction,
  ListenerMiddlewareInstance,
  Middleware,
  Reducer,
  ThunkDispatch,
  configureStore,
} from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { listenerMiddleware, middleware } from '../middleware';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
type StoreSlices<T> = {
  [K in keyof T]: T[K] extends { slice: infer ST }
    ? ST extends { reducer: infer D }
      ? D
      : never
    : never;
};
type Middlewares<S> = ReadonlyArray<Middleware<{}, S>>;
const createStore = <
  ST extends {
    [key in keyof ST]: ST[key];
  },
  M extends Middlewares<ST> = ReadonlyArray<Middleware<{}, ST>>,
>(
  stores: ST,
  middlewareList?: M
) => {
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
    reducer[key] = stores[key].slice.reducer;
  };
  const reducer: StoreSlices<ST> = {} as StoreSlices<ST>;

  for (let key in stores) {
    const keys = key as keyof ST;
    fn(keys, reducer, stores);
  }

  const reduxStore = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat([
        ...middleware,
        ...(middlewareList ? middlewareList : []),
      ]);
    },
  });
  listenerMiddleware.clearListeners();
  // 注册监听
  Object.values<{
    watch: (
      listenerMiddleware: ListenerMiddlewareInstance<
        unknown,
        ThunkDispatch<unknown, unknown, AnyAction>,
        unknown
      >
    ) => void;
  }>(stores).forEach((s) => {
    return s?.watch(listenerMiddleware);
  });
  type P2 = typeof reduxStore extends ToolkitStore<any, infer UU, any> ? UU : never;
  type P3 = typeof reduxStore extends ToolkitStore<any, any, infer UUU> ? UUU : never;

  return reduxStore as ToolkitStore<
    {
      [key in keyof ST]: StoreSlices<ST>[key] extends Reducer<infer SS, any> ? SS : never;
    },
    P2,
    // @ts-ignore
    P3
  >;
};

export default createStore;
