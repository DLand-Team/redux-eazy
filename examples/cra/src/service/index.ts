import {
  createStore,
  flatInjectHookCreater,
  getActionTypeCreater,
  getDp,
  resetReduxHookCreater,
} from 'redux-super';
import { stores } from './stores';

// 前置基本
export const getActionType = getActionTypeCreater(stores);

export const reduxStore = createStore(stores);

// 后置
/* Hooks */
export const useResetRedux = resetReduxHookCreater(stores);
export const useFlat = flatInjectHookCreater(stores, reduxStore);
/* utils */
export const dp = getDp(reduxStore, stores);
