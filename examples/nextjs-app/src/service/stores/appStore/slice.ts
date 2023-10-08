/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../names";

/* Types */
export interface SliceState {
	appInfo: string;
}

const initialState = (): SliceState => {
	return {
		appInfo: "test",
	};
};

const appSlice = createSliceCustom({
	name: names.appStore,
	stateInit: initialState,
	reducers: {
		setAppInfo(state, action: PayloadAction<string>) {
			state.appInfo = action.payload;
		},
	},

	extraReducers: (builder) => {},
});

export default appSlice;
