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
				<div>{appInfo}</div>
				<div>{info}</div>
			</div>
			<A />
			<B />
		</main>
	);
}
