import { PayloadAction } from "redux-eazy";
import { createSlice } from "../..";
import { Pagination, QueryApiRes, SliceState } from "./model";

const initialState = (): SliceState => {
	return {
		title: "test",
		dataList: [],
		pagination: {
			pageNum: 1,
			pageSize: 1,
			total: 0,
		},
	};
};

const slice = createSlice({
	name: "appStore",
	stateInit: initialState,
	branch: ["a", "b"],
	reducers: {
		setTitle(state, { payload }: PayloadAction<Partial<string>>) {
			state.title = payload;
		},
		setPagination(state, { payload }: PayloadAction<Partial<Pagination>>) {
			state.pagination = {
				...state.pagination,
				...payload,
			};
		},
		setDataList(state, action: PayloadAction<QueryApiRes["data"]>) {
			const { list = [], total = 0 } = action.payload ?? {};
			state.dataList = list;
			state.pagination = {
				...state.pagination,
				total,
			};
		},
	},
	// computed: {
	// 	test(state, test) {
	// 		return state.title + "~" + test;
	// 	},
	// },
});

export default slice;
