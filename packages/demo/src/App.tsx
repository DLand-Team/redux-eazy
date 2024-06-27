import { dp, dpChain, useFlatStore } from "./service";

function App() {
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
		<div>
			<div
				onClick={() => {
					// setTitleActA({
					// 	payload: Date.now().toString(),
					// });
					// dp(["appStore", "a"], "setTitle", Date.now().toString());
					dpChain(["appStore", "a"]).setTitle(Date.now().toString());
				}}
			>
				setTitleA
			</div>
			<div
				onClick={() => {
					setTitleActB(Date.now().toString());
				}}
			>
				setTitleB
			</div>
			<div>titleA:{titleA}</div>
			<div>computed:{testA(titleA)}</div>
			<div>titleB:{titleB}</div>
			<div>computed:{testB(titleB)}</div>
		</div>
	);
}

export default App;
