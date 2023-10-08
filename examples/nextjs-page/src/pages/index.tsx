import A from "@/components/a";
import B from "@/components/b";
import { useFlat } from "@/service";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const { setAppInfo } = useFlat("appStore");
	const { setInfo } = useFlat("authStore");
	return (
		<>
			<main className={`${styles.main} ${inter.className}`}>
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
				</div>
			</main>
		</>
	);
}
