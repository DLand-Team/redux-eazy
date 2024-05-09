/* Core */
import { createSliceCustom } from "redux-eazy";
import { PayloadAction } from "redux-eazy";
import names from "../names";

const initialState = (): { pageNum: number } => {
	return {
		pageNum: 1,
	};
};

const slice = createSliceCustom({
	name: names.appStore,
	stateInit: initialState,
	reducers: {
		setPageList(state, { payload }: PayloadAction<any>) {
			state.pageNum = payload.pageList;
		},
	},
});

export default slice;
