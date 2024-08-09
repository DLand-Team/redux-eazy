import { Slice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

const resetReduxHookCreater = <
	S extends {
		[key in keyof S]: {
			slice: Slice;
		};
	}
>(
	stores: S
) => {
	const useResetRedux = () => {
		const dp = useDispatch();
		const func = useMemo<(storeName?: keyof S) => void>(() => {
			return (storeName?: keyof S) => {
				if (storeName) {
					const { reset } = stores[storeName].slice.actions as any;
					reset && dp(reset());
				} else {
					Object.values<{
						slice: Slice;
					}>(stores).forEach((item) => {
						if (Array.isArray(item.slice)) {
							item.slice.forEach((itemB) => {
								const { reset } = itemB.actions as any;
								reset && dp(reset());
							});
						} else {
							const { reset } = item.slice.actions as any;
							reset && dp(reset());
						}
					});
				}
			};
		}, []);
		return func;
	};
	return useResetRedux;
};

export default resetReduxHookCreater;
