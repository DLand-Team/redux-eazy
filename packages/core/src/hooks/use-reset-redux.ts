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
		const func = useMemo<
			(storeName?: keyof S | [keyof S, string]) => void
		>(() => {
			return (storeName?: keyof S | [keyof S, string]) => {
				if (storeName) {
					if (Array.isArray(storeName)) {
						let storeNameTemp =
							storeName.length > 1
								? storeName.join(".")
								: storeName[0];
						const { reset } = stores[storeNameTemp as keyof S].slice
							.actions as any;
						reset && dp(reset());
					} else {
						const { reset } = stores[storeName].slice
							.actions as any;
						reset && dp(reset());
					}
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
