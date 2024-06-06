import "./setup";

import { reduxStore } from ".";
import { Provider } from "redux-eazy";

const ServiceProvider = (props: React.PropsWithChildren) => {
	return <Provider store={reduxStore}>{props.children}</Provider>;
};

export default ServiceProvider;
