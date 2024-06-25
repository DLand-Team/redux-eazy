import { Provider } from "redux-eazy";
import { reduxStore } from ".";
import "./setup";

const ServiceProvider = (props: React.PropsWithChildren) => {
	return <Provider store={reduxStore}>{props.children}</Provider>;
};

export default ServiceProvider;
