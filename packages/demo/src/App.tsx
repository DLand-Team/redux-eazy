import { Button } from "antd";
import { dp, dpChain, useFlatStore } from "./service";

function App() {
	const {
		title: titleOther,
		setTitle: setTitleOther,
		setTitleAct: setTitleActOther,
		test: testOther,
	} = useFlatStore("otherStore");
	const { title, setTitle, setTitleAct, test, testAct } = useFlatStore(
		"appStore",
		{
			title: "IN",
		}
	);
	dpChain("appStore")
		.testAct()
		.then((a) => {
			a.payload.a;
		});
	dp("appStore", "testAct").then((a) => {
		a.payload;
	});
	testAct().then((a) => {
		a.payload.a;
	});
	const {
		title: titleA,
		setTitle: setTitleA,
		setTitleAct: setTitleActA,
		test: testA,
	} = useFlatStore(["appStore", "a"], {
		title: "IN",
	});
	setTitleActA("1");
	const {
		title: titleB,
		setTitle: setTitleB,
		setTitleAct: setTitleActB,
		test: testB,
	} = useFlatStore(["appStore", "b"], {
		title: "IN",
	});
	setTitleActA();
	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<h1>redux-eazy 强大的分支功能</h1>
			</div>
			<div
				style={{
					width: "100vw",
					display: "flex",
					justifyContent: "space-around",
				}}
			>
				<div>
					<div>other</div>
					<div>title:{titleOther}</div>
					<div>computed:{testOther(titleOther)}</div>

					<div
						style={{
							display: "flex",
						}}
					>
						<Button
							onClick={() => {
								setTitleOther(Date.now().toString());
							}}
						>
							setTitle
						</Button>
						<Button
							onClick={() => {
								setTitleActOther({
									payload: Date.now().toString(),
								});
							}}
						>
							setTitleAct
						</Button>
						<Button
							onClick={() => {
								dp(
									"otherStore",
									"setTitle",
									Date.now().toString()
								);
							}}
						>
							dp
						</Button>
						<Button
							onClick={() => {
								dpChain("otherStore").setTitle(
									Date.now().toString()
								);
							}}
						>
							dpChain
						</Button>
					</div>
				</div>
				<div>
					<div>主</div>
					<div>title:{title}</div>
					<div>computed:{test(title)}</div>

					<div
						style={{
							display: "flex",
						}}
					>
						<Button
							onClick={() => {
								setTitle(Date.now().toString());
							}}
						>
							setTitle
						</Button>
						<Button
							onClick={() => {
								setTitleAct(Date.now().toString());
							}}
						>
							setTitleAct
						</Button>
						<Button
							onClick={() => {
								dp(
									"appStore",
									"setTitle",
									Date.now().toString()
								);
							}}
						>
							dp
						</Button>
						<Button
							onClick={() => {
								dpChain("appStore").setTitle(
									Date.now().toString()
								);
							}}
						>
							dpChain
						</Button>
					</div>
				</div>
				<div>
					<div>分支A</div>
					<div>titleA:{titleA}</div>
					<div>computed:{testA(titleA)}</div>
					<div
						style={{
							display: "flex",
						}}
					>
						<Button
							onClick={() => {
								setTitleA(Date.now().toString());
							}}
						>
							setTitleA
						</Button>
						<Button
							onClick={() => {
								setTitleActA(Date.now().toString());
							}}
						>
							setTitleAct
						</Button>
						<Button
							onClick={() => {
								dp(
									["appStore", "a"],
									"setTitle",
									Date.now().toString()
								);
							}}
						>
							dp
						</Button>
						<Button
							onClick={() => {
								dpChain(["appStore", "a"]).setTitleAct(
									Date.now()
								);
							}}
						>
							dpChain
						</Button>
					</div>
				</div>
				<div>
					<div>分支B</div>
					<div>titleB:{titleB}</div>
					<div>computed:{testB(titleB)}</div>
					<div
						style={{
							display: "flex",
						}}
					>
						<Button
							onClick={() => {
								setTitleB(Date.now().toString());
							}}
						>
							setTitleA
						</Button>
						<Button
							onClick={() => {
								setTitleActB({
									payload: Date.now().toString(),
								});
							}}
						>
							setTitleAct
						</Button>
						<Button
							onClick={() => {
								dp(
									["appStore", "b"],
									"setTitle",
									Date.now().toString()
								);
							}}
						>
							dp
						</Button>
						<Button
							onClick={() => {
								dpChain(["appStore", "b"]).setTitle(
									Date.now().toString()
								);
							}}
						>
							dpChain
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
