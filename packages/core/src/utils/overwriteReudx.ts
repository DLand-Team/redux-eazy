import { Action, Dispatch, ThunkAction, UnknownAction } from "@reduxjs/toolkit";

declare class RejectWithValue<Payload, RejectedMeta> {
	readonly payload: Payload;
	readonly meta: RejectedMeta;
	private readonly _type;
	constructor(payload: Payload, meta: RejectedMeta);
}

declare class FulfillWithMeta<Payload, FulfilledMeta> {
	readonly payload: Payload;
	readonly meta: FulfilledMeta;
	private readonly _type;
	constructor(payload: Payload, meta: FulfilledMeta);
}
export type IsAny<T, True, False = never> = true | false extends (
	T extends never ? true : false
)
	? True
	: False;
export type IsUnknown<T, True, False = never> = unknown extends T
	? IsAny<T, False, True>
	: False;
export type BaseThunkAPI<
	S,
	E,
	D extends Dispatch = Dispatch,
	RejectedValue = unknown,
	RejectedMeta = unknown,
	FulfilledMeta = unknown
> = {
	dispatch: D;
	getState: () => S;
	extra: E;
	requestId: string;
	signal: AbortSignal;
	abort: (reason?: string) => void;
	rejectWithValue: IsUnknown<
		RejectedMeta,
		(value: RejectedValue) => RejectWithValue<RejectedValue, RejectedMeta>,
		(
			value: RejectedValue,
			meta: RejectedMeta
		) => RejectWithValue<RejectedValue, RejectedMeta>
	>;
	fulfillWithValue: IsUnknown<
		FulfilledMeta,
		<FulfilledValue>(value: FulfilledValue) => FulfilledValue,
		<FulfilledValue>(
			value: FulfilledValue,
			meta: FulfilledMeta
		) => FulfillWithMeta<FulfilledValue, FulfilledMeta>
	>;
};
type GetState<ThunkApiConfig> = ThunkApiConfig extends {
	state: infer State;
}
	? State
	: unknown;
type GetExtra<ThunkApiConfig> = ThunkApiConfig extends {
	extra: infer Extra;
}
	? Extra
	: unknown;
export type FallbackIfUnknown<T, Fallback> = IsUnknown<T, Fallback, T>;
interface ThunkDispatch<State, ExtraThunkArg, BasicAction extends Action> {
	/** Accepts a thunk function, runs it, and returns whatever the thunk itself returns */
	<ReturnType>(
		thunkAction: ThunkAction<ReturnType, State, ExtraThunkArg, BasicAction>
	): ReturnType;
	/** Accepts a standard action object, and returns that action object */
	<Action extends BasicAction>(action: Action): Action;
	/** A union of the other two overloads for TS inference purposes */
	<ReturnType, Action extends BasicAction>(
		action:
			| Action
			| ThunkAction<ReturnType, State, ExtraThunkArg, BasicAction>
	): Action | ReturnType;
}
type GetDispatch<ThunkApiConfig> = ThunkApiConfig extends {
	dispatch: infer Dispatch;
}
	? FallbackIfUnknown<
			Dispatch,
			ThunkDispatch<
				GetState<ThunkApiConfig>,
				GetExtra<ThunkApiConfig>,
				UnknownAction
			>
	  >
	: ThunkDispatch<
			GetState<ThunkApiConfig>,
			GetExtra<ThunkApiConfig>,
			UnknownAction
	  >;
export type AsyncThunkConfig = {
	state?: unknown;
	dispatch?: Dispatch;
	extra?: unknown;
	rejectValue?: unknown;
	serializedErrorType?: unknown;
	pendingMeta?: unknown;
	fulfilledMeta?: unknown;
	rejectedMeta?: unknown;
};
type GetRejectValue<ThunkApiConfig> = ThunkApiConfig extends {
	rejectValue: infer RejectValue;
}
	? RejectValue
	: unknown;
type GetFulfilledMeta<ThunkApiConfig> = ThunkApiConfig extends {
	fulfilledMeta: infer FulfilledMeta;
}
	? FulfilledMeta
	: unknown;
type GetRejectedMeta<ThunkApiConfig> = ThunkApiConfig extends {
	rejectedMeta: infer RejectedMeta;
}
	? RejectedMeta
	: unknown;

export type GetThunkAPI<ThunkApiConfig> = BaseThunkAPI<
	GetState<ThunkApiConfig>,
	GetExtra<ThunkApiConfig>,
	GetDispatch<ThunkApiConfig>,
	GetRejectValue<ThunkApiConfig>,
	GetRejectedMeta<ThunkApiConfig>,
	GetFulfilledMeta<ThunkApiConfig>
>;

type MaybePromise<T> = T | Promise<T> | (T extends any ? Promise<T> : never);
export type AsyncThunkPayloadCreatorReturnValue<
	Returned,
	ThunkApiConfig extends AsyncThunkConfig
> = MaybePromise<
	| IsUnknown<
			GetFulfilledMeta<ThunkApiConfig>,
			Returned,
			FulfillWithMeta<Returned, GetFulfilledMeta<ThunkApiConfig>>
	  >
	| RejectWithValue<
			GetRejectValue<ThunkApiConfig>,
			GetRejectedMeta<ThunkApiConfig>
	  >
>;

// 以上的这些，就为了下面的一个饺子，我想扩展一下参数。。。

export type AsyncThunkPayloadCreator<
	Returned,
	ThunkArg = void,
	ThunkApiConfig extends AsyncThunkConfig = {}
> = (
	arg: ThunkArg,
	thunkAPI: GetThunkAPI<ThunkApiConfig>,
	branchName?: string
) => AsyncThunkPayloadCreatorReturnValue<Returned, ThunkApiConfig>;
