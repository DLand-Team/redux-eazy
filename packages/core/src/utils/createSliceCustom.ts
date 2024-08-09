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
export type SlicePro<
	State = any,
	CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
	Name extends string = string,
	ReducerPath extends string = string,
	Selectors extends SliceSelectors<State> = SliceSelectors<State>,
	ComputedValue extends Computed<State> = Computed<State>
> = Slice<State, CaseReducers, Name, ReducerPath, Selectors> & {
	computed: ComputedValue;
	branch?: string[];
};
// 自定义options，扩展并定制原api
// 去除initialState，目的就是为了能够传入一个函数作为初始化状态的回掉，内部会运用其来重制
type OptionsCustom<
	State,
	CaseReducers extends SliceCaseReducers<State>,
	Name extends string = string,
	ReducerPath extends string = Name,
	Selectors extends SliceSelectors<State> = SliceSelectors<State>,
	ComputedValue extends Computed<State> = Computed<State>
> = Omit<
	CreateSliceOptions<State, CaseReducers, Name, ReducerPath, Selectors> & {
		branch?: string[];
		stateInit: () => State;
		computed?: Computed<State> & ComputedValue;
	},
	"initialState"
>;

export const createSliceCreater = <T extends string>() => {
	return function createSliceE<
		State,
		CaseReducers extends SliceCaseReducers<State>,
		Name extends string = T,
		ReducerPath extends string = Name,
		Selectors extends SliceSelectors<State> = SliceSelectors<State>,
		ComputedValue extends Computed<State> = {}
	>(
		options: OptionsCustom<
			State,
			CaseReducers,
			Name,
			ReducerPath,
			Selectors,
			ComputedValue
		>
	): SlicePro<
		State,
		CaseReducers,
		Name,
		ReducerPath,
		Selectors,
		ComputedValue
	> {
		const {
			branch,
			stateInit,
			reducers: reducersBase,
			computed,
			...rest
		} = options;
		// 如果存在分身配置，那么直接创建多个实例
		if (branch && Array.isArray(branch)) {
			const slice = createSlice({
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
			//@ts-ignore
			slice.computed = computed;
			//@ts-ignore
			slice.branch = branch;
			//@ts-ignore
			const value = [
				slice,
				...branch.map((branchName) => {
					const slice = createSlice({
						...rest,
						name: `${rest.name as string}.${
							branchName as string
						}` as any,
						reducers: {
							...reducersBase,
							reset: stateInit,
							setState(
								state,
								action: PayloadAction<Partial<State>>
							) {
								const { payload } = action;
								return {
									...state,
									...payload,
								};
							},
						},
						initialState: stateInit,
					}) as Slice<
						State,
						CaseReducers,
						Name,
						ReducerPath,
						Selectors
					>;
					//@ts-ignore
					slice.computed = computed;
					//@ts-ignore
					slice.branchName = branchName;
					//@ts-ignore
					slice.branch = branch;
					return slice as Slice<
						State,
						CaseReducers,
						Name,
						ReducerPath,
						Selectors
					> & {
						computed: ComputedValue;
					};
				}),
			];
			//@ts-ignore
			value.branch = branch;
			//@ts-ignore
			return value;
		} else {
			const slice = createSlice({
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
			//@ts-ignore
			slice.computed = computed;

			return slice as Slice<
				State,
				CaseReducers,
				Name,
				ReducerPath,
				Selectors
			> & {
				computed: ComputedValue;
			};
		}
	};
};
// 定制化的createSlice
