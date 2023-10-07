import { Slice } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

const resetReduxHookCreater = <
  S extends {
    [key in keyof S]: {
      slice: Slice;
    };
  },
>(
  stores: S
) => {
  const useResetRedux = () => {
    const dp = useDispatch();
    const func = useMemo<() => void>(() => {
      return () => {
        Object.values<{
          slice: Slice;
        }>(stores).forEach((item) => {
          const { reset } = item.slice.actions as any;
          reset && dp(reset());
        });
      };
    }, []);
    return func;
  };
  return useResetRedux;
};

export default resetReduxHookCreater;
