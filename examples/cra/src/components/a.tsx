import { useFlat } from "../service";

const A = () => {
	const { info } = useFlat("authStore");
	return <div>A:{info}</div>;
};
export default A;
