import path from "path";
import { defineConfig } from "vite";

// ----------------------------------------------------------------------

export default defineConfig({
	build: {
		minify: process.env.DEBUG ? false : false,
		sourcemap: "inline",
		lib: {
			entry: "src/index.ts", // 设置入口文件
			name: "guide-eazy", // 起个名字
			fileName: (format) => `guide-eazy.${format}.js`, // 打包后的文件名
		},
		cssCodeSplit: false,
		rollupOptions: {
			external: [
				"react",
				"react-dom",
				"react-dom/client",
				"react/jsx-runtime",
				"react/jsx-dev-runtime",
				"@emotion/react",
				"@mui/material",
				"@emotion/styled",
				"@mui/system",
				"@mui/x-data-grid",
				"@mui/x-date-pickers",
				"yup",
				"@mui/lab",
			],
			output: {
				sourcemap: process.env.DEBUG ? true : false,
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"react-dom/client": "ReactDOMClient",
					"react/jsx-runtime": "ReactJSXRuntime",
					"react/jsx-dev-runtime": "ReactJSXDevRuntime",
					"@mui/system": "@mui/system",
					yup: "yup",
					"@emotion/react": "@emotion/react",
					"@mui/material": "@mui/material",
					"@emotion/styled": "@emotion/styled",
				},
			},
		},
	},
	resolve: {
		alias: [
			{
				find: /^~(.+)/,
				replacement: path.join(process.cwd(), "node_modules/$1"),
			},
			{
				find: /^src(.+)/,
				replacement: path.join(process.cwd(), "src/$1"),
			},
		],
	},
});
