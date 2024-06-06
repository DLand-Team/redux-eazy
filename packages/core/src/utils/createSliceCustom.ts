import {
	CreateSliceOptions,
	PayloadAction,
	Slice,
	SliceCaseReducers,
	SliceSelectors,
	createSlice,
} from "@reduxjs/toolkit";

export type Computed<State> = {
	[K: string]: (sliceState: State, ...args: any[]) => any;
};
// 自定义options，扩展并定制原api
// 去除initialState，目的就是为了能够传入一个函数作为初始化状态的回掉，内部会运用其来重制
type OptionsCustom<
	State,
	CaseReducers extends SliceCaseReducers<State>,
	Name extends string = string,
	ReducerPath extends string = Name,
	Selectors extends SliceSelectors<State> = SliceSelectors<State>,
> = Omit<
	CreateSliceOptions<State, CaseReducers, Name, ReducerPath, Selectors> & {
		stateInit: () => State;
	},
	"initialState"
>;

// 定制化的createSlice
export function createSliceE<
	State,
	CaseReducers extends SliceCaseReducers<State>,
	Name extends string = string,
	ReducerPath extends string = Name,
	Selectors extends SliceSelectors<State> = SliceSelectors<State>,
	ComputedValue extends Computed<State> = Computed<State>,
>(
	options: OptionsCustom<State, CaseReducers, Name, ReducerPath, Selectors>,
): Slice<State, CaseReducers, Name, ReducerPath, Selectors> & {
	computed: ComputedValue;
} {
	const { stateInit, reducers: reducersBase, ...rest } = options;
	//todo
	const a = createSlice({
		...rest,
		reducers: {
			...reducersBase,
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
	}) as Slice<State, CaseReducers, Name, ReducerPath, Selectors>;
	return a as Slice<State, CaseReducers, Name, ReducerPath, Selectors> & {
		computed: ComputedValue;
	};
}
