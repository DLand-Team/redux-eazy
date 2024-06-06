import { dp, reduxStore, useFlatStore } from "./service";

function App() {
	const { title, setTitle, queryAct } = useFlatStore("appStore");
	queryAct().then((a) => {
		debugger;
		a.payload
	});
	return (
		<div>
			<div
				onClick={() => {
					setTitle(Date.now().toString());
				}}
			></div>
			{title}
		</div>
	);
}

export default App;
