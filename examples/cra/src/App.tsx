import "./App.css";
import A from "./components/a";
import B from "./components/b";
import { useFlat } from "./service";

function App() {
	const { setAppInfo, } = useFlat("appStore");
	const { setInfo ,testAct} = useFlat("authStore");
	return (
		<div className="App">
			<header className="App-header">
				<div>
					<A></A>
					<button
						onClick={() => {
							setAppInfo(Date.now().toString());
						}}
					>
						btn1
					</button>
				</div>
				<div>
					<B></B>
					<button
						onClick={() => {
							setInfo(Date.now().toString());
						}}
					>
						btn2
					</button>
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
