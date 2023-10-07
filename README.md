<p align="center">
 <img src="https://qiniu.moderate.run/img/Console03.svg" alt="favicon-x128.png" border="0" />
</p>
<h1 align="center">Redux Super</h1>

<p align="center">
  <img src="https://shields.io/badge/TypeScript-Driver-green?logo=typescript" alt="lang">
  <img src="https://shields.io/badge/version-0.0.5-green?logo=github" alt="version">
</p>

# Redux Super
## 使用方法
### 安装

```shell
pnpm i redux-super
```

### 创建store实体

```ts
/* name */
import slice from './slice';
import thunks from './thunks';
import watch from './watch';

const store: { slice: typeof slice; thunks: typeof thunks; watch: typeof watch } = {
  slice,
  thunks,
  watch,
};

export default store;

```
具体细节

### 注册store的名字

```ts
const names = {
  authStore: 'authStore',
  appStore: 'appStore',
};

export default names;

```
### 创建slice-仓库切片

**主要职责：**

1. 定义状态变量：通过传入初始化状态函数给额外设立的`stateInit`
    - 设立`stateInit`的目的：为了能够实现重置redux
2. 设置reducer：对状态进行更改
3. 额外配置extraReducer：针对redux的thunk的pending，rejected，pending三种状态进行配置reducer



```ts
/* Core */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import names from '../names';
import { IGeo } from 'src/service/model/geo';
import { createSliceCustom } from 'src/redux-helper';

/* Types */
export interface SliceState {
  geoData: IGeo[];
  info: string;
}

const initialState = (): SliceState => {
  return {
    geoData: [],
    info: 'test',
  };
};

const appSlice = createSliceCustom({
  name: names.appStore,
  stateInit: initialState,
  reducers: {
    setInfo(state, action: PayloadAction<string>) {
      state.info = action.payload;
    },
    setGeoData(state, action: PayloadAction<IGeo[]>) {
      state.geoData = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export default appSlice;

```

### 创建thunks-异步操作

**主要职责：**

1. 创建异步操作thunk
2. 整合http请求业务
3. 通过dispatch修改任意仓库的状态


```ts
/* Instruments */
import { dp } from 'src/service';
import { FileUploadApiRequest } from 'src/service/model/appStoreModel';
import { QueryGeoRequest } from 'src/service/model/model';
import { createThunks } from 'src/service/setup';
import names from '../names';
import httpApi from './api';

const thunks = createThunks(names.appStore, {
  geoQueryAct: async (arg: QueryGeoRequest, api) => {
    const { data } = await httpApi.geoQueryApi(arg);
    dp('appStore', 'setGeoData', data);
  },
  getUploadUrlAct: async (arg: FileUploadApiRequest, api) => {
    const { file, ...rest } = arg;
    const { data } = await httpApi.getUploadUrlApi(rest);
    const { fileUrl, presignedUrl } = data;
    await httpApi.fileUploadApi(presignedUrl, file!);
    return { presignedUrl, fileUrl };
  },
});
export default thunks;

```

### 创建watch

**主要职责：**

1. 监听包括自身仓库的所有仓库的改变，进行响应

```ts
import { ListenerMiddleware, createMatcher } from 'src/redux-helper';
import { dp, getActionType } from 'src/service';
import { SliceState } from './slice';
import { startAppListening } from 'src/service/setup';

const watch = (listenerMiddleware: ListenerMiddleware) => {
  startAppListening({
    matcher: createMatcher<SliceState>((action) => {
      return action.type == `${getActionType('appStore').setInfo}`;
    }),
    effect: (_) => {
      dp('authStore', 'setToken', { token: Date.now().toString() });
    },
  });
  // 监听例子
  listenerMiddleware.startListening({
    predicate: (action, currentState, previousState) => {
      return false;
    },
    effect: async (action, listenerApi) => {},
  });
};

export default watch;

```


### 创建api
```ts
import { http } from 'src/common/http';
import { QueryGeoRequest } from '../../model/model';
import { IGeo } from 'src/service/model/geo';
import { FileUploadApiRequest, FileUploadApiRespone } from 'src/service/model/appStoreModel';

function geoQueryApi(params: QueryGeoRequest) {
  return http.request<{ content: IGeo[] }>({
    url: '/nestApi/geo/query',
    method: 'POST',
    data: params,
  });
}

function fileUploadApi(url: string, params: File) {
  return http.put(url, params, {
    headers: {
      "Content-Type": 'multipart/form-data'
    }
  });
}

function getUploadUrlApi(params: FileUploadApiRequest) {
  return http.request<{ content: FileUploadApiRespone }>({
    url: '/nestApi/file/get/uploadUrl',
    method: 'POST',
    data: params,
  });
}

const api = {
  getUploadUrlApi,
  geoQueryApi,
  fileUploadApi,
};

export default api;

```

### 配置类型支持

```ts
import { Action, ThunkAction, TypedStartListening } from '@reduxjs/toolkit';
import {
  appSelectorHookCreater,
  getCreateThunkWithName,
  getCreateThunks,
  listenerMiddleware,
  useReduxDispatch,
} from 'redux-super';
import { reduxStore } from './index';
/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
export const createThunkWithName = getCreateThunkWithName<ReduxState, ReduxDispatch>;
export const useDispatch = useReduxDispatch<ReduxDispatch>;
export const useAppSelecter = appSelectorHookCreater<ReduxState>;
export type AppStartListening = TypedStartListening<ReduxState, ReduxDispatch>;
export const startAppListening = listenerMiddleware.startListening as AppStartListening;
export const createThunks = getCreateThunks<ReduxState, ReduxDispatch>();

```
### 创建reduxStore

```ts
import {
  createStore,
  flatInjectHookCreater,
  getActionTypeCreater,
  getDp,
  resetReduxHookCreater,
} from 'redux-super';
import { stores } from './stores';

// 前置基本
export const getActionType = getActionTypeCreater(stores);

export const reduxStore = createStore(stores);

// 后置
/* Hooks */
export const useResetRedux = resetReduxHookCreater(stores);
export const useFlat = flatInjectHookCreater(stores, reduxStore);
/* utils */
export const dp = getDp(reduxStore, stores);

```


## hooks
### useFlatInject
`reducer`，`thunk`，`state`全都扁平的被导出，这是件非常爽的事情，并且`thunk`无需`dispatch`，直接执行就行。

```ts
import Talk from 'talkjs';
import { useEffect, useRef } from 'react';
import { useFlatInject } from '../hooks';

const ChatFunction = () => {
  const { userInfo, userInfoMemberAct } = useFlatInject('authStore');
  useEffect(() => {
    userInfoMemberAct()
  }, []);

  const chatContainer = useRef(null);

  return (
    <div>
      <div ref={chatContainer} style={{ height: '800px' }}></div>
    </div>
  );
};

export default ChatFunction;
```
### useResetRedux
重置redux
```ts
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import storageHelper from 'src/common/utils/storageHelper';
import { stores } from 'src/service/stores';

const useResetRedux = () => {
  const dp = useDispatch();
  const func = useMemo<() => void>(() => {
    return () => {
      storageHelper.clear();
      Object.values(stores).forEach((item) => {
        const { reset } = item.slice.actions as any;
        reset && dp(reset());
      });
    };
  }, []);
  return func;
};

export default useResetRedux;

```
### useAppSelector
### useDispatch

## utils
### awsomeDispatch
### createThunkWithName
### createSliceCustom
### createWatchMatcher
### getActionType

