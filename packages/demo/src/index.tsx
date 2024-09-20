import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./service/setup";
import "./index.css";
import SuperProvider from "./service/providers";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<SuperProvider>
			<App />
		</SuperProvider>
	</React.StrictMode>
);
