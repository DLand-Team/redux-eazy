import clsx from "clsx";
//@ts-ignore
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
	title: string;
	Svg: string;
	description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
	{
		title: "Easy to Use",
		Svg: require("@site/static/img/icon3.png").default,
		description: (
			<>
				Mui Eazy is a simple and easy-to-use component library built on
				top of MUI.
			</>
		),
	},
	{
		title: "Focus on Front-end Business Scenarios",
		Svg: require("@site/static/img/icon2.png").default,
		description: (
			<>
				Developing practical components for common business scenarios to
				provide robust support for development.
			</>
		),
	},
	{
		title: "Powered by React",
		Svg: require("@site/static/img/icon1.png").default,
		description: (
			<>
				Comprehensive development documentation covering the component
				library, hooks, utility function library, etc., providing a
				complete, concise, and user-friendly resource.
			</>
		),
	},
];

function Feature({ title, Svg, description }: FeatureItem) {
	return (
		<div className={clsx("col col--4 ")}>
			<div className={styles.card}>
				<div className="text--center">
					<img src={Svg} className={styles.featureSvg} role="img" />
				</div>
				<div className="text--center padding-horiz--md">
					<Heading as="h3">{title}</Heading>
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
}

export default function HomepageFeatures(): JSX.Element {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
