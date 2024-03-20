import {
	Box,
	Dialog,
	DialogContent,
	IconButton,
	Stack,
	styled,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import BrowserWindow from "@site/src/components/BrowserWindow";
import TabNav from "@site/src/components/TabNav";
import { useMemo, useRef, useState } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import scope from "../../theme/ReactLiveScope";
import { Editor } from "./Editor";
import { Iconify } from "mui-eazy";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialog-container": {
		backdropFilter: "blur(5px)",
	},
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
		display: "flex",
		height: "auto",
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
	"& .MuiDialog-paper": {
		position: "relative",
	},
}));

const LiveCode = ({
	codeConfig = [],
	isShowModal,
}: {
	isShowModal?: any;
	codeConfig?: { title: string; code: string }[];
}) => {
	const switchFlag = useRef(0);
	const [current, setCurrent] = useState<string | number>(0);
	const codeRecord = useRef(codeConfig);
	const [codeArr, setCodeArr] = useState(codeConfig);
	const code = codeArr
		.map((item) => {
			return item.code;
		})
		.join("\n");
	const CodePreview = useMemo(() => {
		console.log(code);
		debugger;
		return (
			<LiveProvider
				code={code}
				scope={{ ...scope, BrowserWindow }}
				noInline={true}
			>
				<LiveEditor style={{ display: "none" }}></LiveEditor>
				<BrowserWindow
					bodyStyle={{
						flex: 1,
						height: 0,
						overflow: "auto",
					}}
					style={{
						height: "100%",
					}}
					handleCodeClick={() => {
						isShowModal.onToggle();
					}}
					url=""
				>
					<LivePreview></LivePreview>
					<LiveError></LiveError>
				</BrowserWindow>
			</LiveProvider>
		);
	}, [code]);
	return (
		<BootstrapDialog
			fullWidth={true}
			maxWidth="xl"
			open={isShowModal.value}
			title={"LIVE EDITOR"}
			onClose={() => {
				isShowModal.onFalse();
			}}
		>
			<DialogContent>
				<Stack
					sx={{
						width: "100%",
						height: "auto",
					}}
				>
					<IconButton
						aria-label="close"
						onClick={() => {
							isShowModal.onFalse();
						}}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
							zIndex: 30,
						}}
					>
						<Iconify width={16} icon={"icon-park-outline:close"} />
					</IconButton>
					<div
						style={{
							width: "100%",
							marginBottom: "10px",
							position: "relative",
							left: "-10px",
						}}
					>
						<TabNav
							tabConfig={codeArr}
							value={current}
							onChange={(newVal) => {
								switchFlag.current = 1;
								setCurrent(newVal);
							}}
						></TabNav>
					</div>

					<Box
						sx={{
							width: "100%",
							height: "100%",
							overflow: "hidden",
							flexGrow: 1,
							scrollbarWidth: "thin",
							scrollbarColor: "red",
						}}
					>
						<Grid
							columnSpacing={2}
							container
							sx={{
								height: "100%",
							}}
						>
							<Grid
								item
								xs={6}
								style={{
									minWidth: "50%",
									minHeight: "500px",
									height: "100%",
									overflow: "auto",
									background: "rgb(1, 22, 39)",
								}}
							>
								<Editor
									onChange={(code) => {
										if (switchFlag.current) {
											switchFlag.current = 0;
										} else {
											codeArr[current].code = code;
											setCodeArr([...codeArr]);
										}
									}}
									current={current}
									code={codeArr[current].code}
								/>
							</Grid>
							<Grid
								sx={{
									height: "100%",
								}}
								id={"modalGrid"}
								item
								xs={6}
							>
								{CodePreview}
							</Grid>
						</Grid>
					</Box>
				</Stack>
			</DialogContent>
		</BootstrapDialog>
	);
};

export default LiveCode;
