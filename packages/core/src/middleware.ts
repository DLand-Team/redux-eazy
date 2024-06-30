/* Core */
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import Redux from "redux";
const listenerMiddleware = createListenerMiddleware();

const middlewares: Redux.Middleware[] = [
	listenerMiddleware.middleware,
	createLogger({
		duration: true,
		timestamp: false,
		collapsed: true,
		colors: {
			title: () => "#139BFE",
			prevState: () => "#1C5FAF",
			action: () => "#149945",
			nextState: () => "#A47104",
			error: () => "#ff0005",
		},
		predicate: () => typeof window !== "undefined",
	}) as Redux.Middleware,
];

export { listenerMiddleware, middlewares };
