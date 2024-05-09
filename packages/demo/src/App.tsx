import "./App.css";
import A from "./components/a";
import { dp, useFlat } from "./service";

function App() {
	const { setPageList } = useFlat("appStore");
	return (
		<div className="App">
			<header className="App-header">
				<div>
					<A></A>
					<button onClick={() => {}}>btn1</button>
				</div>
				<a
					className="App-link"
					href="https://github.com/DLand-Team"
					target="_blank"
					rel="noopener noreferrer"
				>
					闲D岛🏝️
				</a>
			</header>
		</div>
	);
}

export default App;
