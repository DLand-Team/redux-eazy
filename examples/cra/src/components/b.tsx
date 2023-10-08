import { useFlat } from "../service";

const B = () => {
	const { appInfo } = useFlat("appStore");
	return (
		<div>
			B:{appInfo}
		</div>
	);
};
export default B;
