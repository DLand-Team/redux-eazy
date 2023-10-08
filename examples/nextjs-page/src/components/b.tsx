"use client";

import { useFlat } from "@/service";

const B = () => {
	const { info } = useFlat("authStore");
	return (
		<div
			style={{
				margin: 20,
			}}
		>
			B Component:{info}
		</div>
	);
};
export default B;
