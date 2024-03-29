import {
	CreateSliceOptions,
	PayloadAction,
	Slice,
	SliceCaseReducers,
	createSlice,
} from "@reduxjs/toolkit";

// 自定义options，扩展并定制原api
type OptionsCustom<
	State,
	CaseReducers extends SliceCaseReducers<State>,
	Name extends string = string,
> = Omit<
	CreateSliceOptions<State, CaseReducers, Name> & { stateInit: () => State },
	"initialState"
>;

// 定制化的createSlice
export function createSliceCustom<
	State,
	CaseReducers extends SliceCaseReducers<State>,
	Name extends string = string,
>(
	options: OptionsCustom<State, CaseReducers, Name>,
): Slice<State, CaseReducers, Name> {
	const { stateInit, reducers: reducersOld, ...rest } = options;
	return createSlice({
		...rest,
		reducers: {
			...reducersOld,
			reset: stateInit,
			setState(state, action: PayloadAction<Partial<State>>) {
				const { payload } = action;
				return {
					...state,
					...payload,
				};
			},
		},
		initialState: stateInit,
	});
}
