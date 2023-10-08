"use client";
/* Core */
import { Provider } from "react-redux";
import "./setup";
/* Instruments */

import { reduxStore } from ".";

const App = (props: React.PropsWithChildren<{}>) => {
	return <>{props.children}</>;
};

const Providers = (props: React.PropsWithChildren<{}>) => {
	return (
		<Provider store={reduxStore}>
			<App>{props.children}</App>
		</Provider>
	);
};

export default Providers;
