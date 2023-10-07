"use client";

import { useFlat } from "@/service";

const B = () => {
	const { setInfo } = useFlat("authStore");
	return (
		<div
			style={{
				margin: 20,
			}}
			onClick={() => {
				setInfo(Date.now().toString());
			}}
		>
			B Component
		</div>
	);
};
export default B;
