"use client";

import { useFlat } from "@/service";

const A = () => {
	const { setAppInfo } = useFlat("appStore");
	return (
		<div
			style={{
				margin: 20,
			}}
			onClick={() => {
				setAppInfo(Date.now().toString());
			}}
		>
			A Component
		</div>
	);
};
export default A;
