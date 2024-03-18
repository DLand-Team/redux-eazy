/* Core */
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
const listenerMiddleware = createListenerMiddleware();

const middleware = [
  listenerMiddleware.middleware,
  createLogger({
    duration: true,
    timestamp: false,
    collapsed: true,
    colors: {
      title: () => '#139BFE',
      prevState: () => '#1C5FAF',
      action: () => '#149945',
      nextState: () => '#A47104',
      error: () => '#ff0005',
    },
    predicate: () => typeof window !== 'undefined',
  }),
];

export type ListenerMiddleware = typeof listenerMiddleware;
export { listenerMiddleware, middleware };
