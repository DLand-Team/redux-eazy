/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import * as components from "./components";
import * as Mui from "@mui/material";
import dayjs from "dayjs";
import * as Yup from "yup";
import Highlight from "@site/src/components/Highlight";
import TweetQuote from "@site/src/components/TweetQuote";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

let muiEzay = {};
if (ExecutionEnvironment.canUseDOM) {
	muiEzay = require("mui-eazy");
}
export default ExecutionEnvironment.canUseDOM
	? {
			React,
			dayjs,
			Yup,
			Highlight,
			TweetQuote,
			...React,
			...components,
			...Mui,
			...muiEzay,
		}
	: {
			React,
			dayjs,
			Yup,
			Highlight,
			TweetQuote,
			...React,
			...Mui,
		};
