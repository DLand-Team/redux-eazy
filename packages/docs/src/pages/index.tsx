import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Logo from "@site/static/img/logo.svg";
import Layout from "@theme/Layout";
import styles from "./index.module.scss";
import Link from "@docusaurus/Link";

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();
	debugger;
	return (
		<header className={styles.heroBanner}>
			<div
				className="container"
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<div className={styles.header}>
					<div className={styles.infoPart}>
						<p className={styles.title}>ReduxEazy</p>
						<p className={styles.title2}>
							A very usable, type-friendly version of Redux
						</p>
						<p className={styles.title3}>
							Powerful, clean code, efficient development, always
							open source
						</p>
						<div className={styles.btnPart}>
							<Link className={styles.btn} to="/docs/intro">
								Get Started
							</Link>
							<Link
								className={`${styles.btn} ${styles.btn2}`}
								to="https://github.com/DLand-Team/mui-eazy"
							>
								View on GitHub
							</Link>
						</div>
					</div>
					<div className={styles.logoPart}>
						<div className={styles.image}>
							<div className={styles.imageContainer}>
								<div className={styles.imageBg}></div>
								<Logo className={styles.logo}></Logo>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default function Home(): JSX.Element {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description="Description will go into a meta tag in <head />"
		>
			<HomepageHeader />
			<main>
				<HomepageFeatures />
			</main>
		</Layout>
	);
}
