import * as monaco from "monaco-editor";
import React, { useEffect, useRef } from "react";

export const Editor: React.FC<{
	code: string;
	onChange: (code: string) => void;
	current: string | number;
}> = ({ code, onChange, current }) => {
	const divEl = useRef<HTMLDivElement>(null);
	let editor = useRef<monaco.editor.IStandaloneCodeEditor>();
	useEffect(() => {
		if (divEl.current) {
			const monacoLib = require("monaco-editor") as typeof monaco;
			editor.current = monacoLib.editor.create(divEl.current, {
				value: code,
				language: "typescript",
				theme: "vs-dark",
				renderValidationDecorations: "off",
				automaticLayout: true,
			} as monaco.editor.IStandaloneEditorConstructionOptions);
			monacoLib.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
				{
					noSemanticValidation: false,
					noSyntaxValidation: false,
				},
			);
			editor.current.onDidChangeModelContent((e) => {
				let value = editor.current.getValue();
				onChange(value);
			});
		}
		return () => {
			editor.current.dispose();
		};
	}, [current]);

	editor.current?.layout();
	useEffect(() => {
		editor.current?.setValue(code);
	}, [current]);
	return (
		<div
			style={{
				height: "100%",
			}}
			className="Editor"
			ref={divEl}
		></div>
	);
};
