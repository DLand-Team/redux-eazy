/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import BrowserOnly from "@docusaurus/BrowserOnly";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { forwardRef } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import LiveCode from "@site/src/components/liveCode";
// hoc: 包装组件和函数
const Hoc = (name, optionCallf?) => {
	return forwardRef((props, ref) => {
		return (
			<BrowserOnly>
				{() => {
					optionCallf?.();
					const LibComponent = require("mui-eazy")[name];
					return <LibComponent ref={ref} {...props} />;
				}}
			</BrowserOnly>
		);
	});
};

const HocFunc = (name, optionCallf?) => {
	optionCallf?.();
	return (props?) => {
		console.log(props);
		const isBro = useIsBrowser();
		return isBro && require("mui-eazy")[name](props);
	};
};

const HocObj = (name, optionCallf?) => {
	optionCallf?.();
	return ExecutionEnvironment.canUseDOM && require("mui-eazy")[name];
};

// lib
export const LiveCodeClient = () => {
	return ExecutionEnvironment.canUseDOM ? (
		<BrowserOnly>
			{() => {
				return <LiveCode></LiveCode>;
			}}
		</BrowserOnly>
	) : (
		<div></div>
	);
};
