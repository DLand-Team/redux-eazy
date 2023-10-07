import { PayloadAction, isAllOf, isAnyOf } from '@reduxjs/toolkit';

export function createMatcher<T = any>(
  callF: (action: PayloadAction<T>) => boolean,
  type: 'isAnyOf' | 'isAllOf' = 'isAnyOf'
): (action: PayloadAction<T>) => action is PayloadAction<any> {
  return {
    isAnyOf,
    isAllOf,
  }[type](callF as (action: PayloadAction<T>) => action is PayloadAction<any>);
}
