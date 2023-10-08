/* Core */
import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceCustom } from "redux-eazy";
import names from "../names";

/* Types */
export interface SliceState {
	info: string;
}

const initialState = (): SliceState => {
	return {
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
	},

	extraReducers: (builder) => {},
});

export default appSlice;
