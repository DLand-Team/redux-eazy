<p align="center">
 <img src="https://qiniu.moderate.run/img/Console03.svg" alt="favicon-x128.png" border="0" />
</p>
<h1 align="center">Redux Eazy</h1>

<p align="center">
  <img src="https://shields.io/badge/TypeScript-Driver-green?logo=typescript" alt="lang">
  <img src="https://shields.io/badge/version-0.0.5-green?logo=github" alt="version">
</p>

# Redux Eazy

## Usage

### install

```shell
pnpm i redux-eazy
```

### Create Store Entity

```ts
/* name */
import slice from "./slice";
import thunks from "./thunks";
import watch from "./watch";

const store: {
	slice: typeof slice;
	thunks: typeof thunks;
	watch: typeof watch;
} = {
	slice,
	thunks,
	watch,
};

export default store;
```

### Register Store Names

```ts
const names = {
	authStore: "authStore",
	appStore: "appStore",
};

export default names;
```

### Create Slice - Store Slice

**Main Responsibilities:**

1. Define state variables and initialize state.
    - The purpose of setting stateInit is to enable the reset of Redux.
2. Set reducers to modify the state.
3. Configure extraReducers for Redux thunks.

```ts
/* Core */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import names from "../names";
import { IGeo } from "src/service/model/geo";
import { createSliceCustom } from "src/redux-helper";

/* Types */
export interface SliceState {
	geoData: IGeo[];
	info: string;
}

const initialState = (): SliceState => {
	return {
		geoData: [],
		info: "test",
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

### Create Thunks - Asynchronous Operations

**Main Responsibilities:**

1. Create asynchronous operation thunks.
2. Integrate HTTP request logic.
3. Modify the state of any repository through dispatch.

```ts
/* Instruments */
import { dp } from "src/service";
import { FileUploadApiRequest } from "src/service/model/appStoreModel";
import { QueryGeoRequest } from "src/service/model/model";
import { createThunks } from "src/service/setup";
import names from "../names";
import httpApi from "./api";

const thunks = createThunks(names.appStore, {
	geoQueryAct: async (arg: QueryGeoRequest, api) => {
		const { data } = await httpApi.geoQueryApi(arg);
		dp("appStore", "setGeoData", data);
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

### Create Watch

**Main Responsibilities:**

1. Listen for changes in all repositories, including its own, and respond accordingly.

```ts
import { ListenerMiddleware, createMatcher } from "src/redux-helper";
import { dp, getActionType } from "src/service";
import { SliceState } from "./slice";
import { startAppListening } from "src/service/setup";

const watch = (listenerMiddleware: ListenerMiddleware) => {
	startAppListening({
		matcher: createMatcher<SliceState>((action) => {
			return action.type == `${getActionType("appStore").setInfo}`;
		}),
		effect: (_) => {
			dp("authStore", "setToken", { token: Date.now().toString() });
		},
	});
	listenerMiddleware.startListening({
		predicate: (action, currentState, previousState) => {
			return false;
		},
		effect: async (action, listenerApi) => {},
	});
};

export default watch;
```

### Create API

```ts
import { http } from "src/common/http";
import { QueryGeoRequest } from "../../model/model";
import { IGeo } from "src/service/model/geo";
import {
	FileUploadApiRequest,
	FileUploadApiRespone,
} from "src/service/model/appStoreModel";

function geoQueryApi(params: QueryGeoRequest) {
	return http.request<{ content: IGeo[] }>({
		url: "/nestApi/geo/query",
		method: "POST",
		data: params,
	});
}

function fileUploadApi(url: string, params: File) {
	return http.put(url, params, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}

function getUploadUrlApi(params: FileUploadApiRequest) {
	return http.request<{ content: FileUploadApiRespone }>({
		url: "/nestApi/file/get/uploadUrl",
		method: "POST",
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

### Configuration for Type Support

```ts
import { Action, ThunkAction, TypedStartListening } from "@reduxjs/toolkit";
import {
	appSelectorHookCreater,
	getCreateThunkWithName,
	getCreateThunks,
	listenerMiddleware,
	useReduxDispatch,
} from "redux-super";
import { reduxStore } from "./index";
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
export const createThunkWithName = getCreateThunkWithName<
	ReduxState,
	ReduxDispatch
>;
export const useDispatch = useReduxDispatch<ReduxDispatch>;
export const useAppSelecter = appSelectorHookCreater<ReduxState>;
export type AppStartListening = TypedStartListening<ReduxState, ReduxDispatch>;
export const startAppListening =
	listenerMiddleware.startListening as AppStartListening;
export const createThunks = getCreateThunks<ReduxState, ReduxDispatch>();
```

### Create Redux Store

```ts
import {
	createStore,
	flatInjectHookCreater,
	getActionTypeCreater,
	getDp,
	resetReduxHookCreater,
} from "redux-super";
import { stores } from "./stores";

export const getActionType = getActionTypeCreater(stores);

export const reduxStore = createStore(stores);

/* Hooks */
export const useResetRedux = resetReduxHookCreater(stores);
export const useFlat = flatInjectHookCreater(stores, reduxStore);
/* utils */
export const dp = getDp(reduxStore, stores);
```

## hooks

### useFlatInject

`Reducers`, `thunks`, and `states` are all exported in a flat structure, which is quite convenient. Moreover, thunks can be executed directly without needing to dispatch them. This is quite handy.

```ts
import Talk from "talkjs";
import { useEffect, useRef } from "react";
import { useFlatInject } from "../hooks";

const ChatFunction = () => {
	const { userInfo, userInfoMemberAct } = useFlatInject("authStore");
	useEffect(() => {
		userInfoMemberAct();
	}, []);

	const chatContainer = useRef(null);

	return (
		<div>
			<div ref={chatContainer} style={{ height: "800px" }}></div>
		</div>
	);
};

export default ChatFunction;
```

### useResetRedux

reset redux

```ts
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import storageHelper from "src/common/utils/storageHelper";
import { stores } from "src/service/stores";

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
