"use client";

import { useFlat } from "@/service";

const A = () => {
	const { appInfo } = useFlat("appStore");
	return (
		<div
			style={{
				margin: 20,
			}}
		>
			A Component:{appInfo}
		</div>
	);
};
export default A;
