"use client";
import styles from "./page.module.css";
import A from "../components/a";
import B from "../components/b";
import { useFlat } from "@/service";

export default function Home() {
	const { appInfo } = useFlat("appStore");
	const { info } = useFlat("authStore");
	return (
		<main className={styles.main}>
			<div>
				<a
					className="App-link"
					href="https://github.com/DLand-Team"
					target="_blank"
					rel="noopener noreferrer"
				>
					闲D岛🏝️
				</a>
				<div>
					<div>{appInfo}</div>
					<A />
				</div>
				<div>
					<div>{info}</div>
					<B />
				</div>
			</div>
		</main>
	);
}
