import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';

const appSelectorHookCreater = <T>() => {
  return useReduxSelector as TypedUseSelectorHook<T>;
};
export default appSelectorHookCreater;
