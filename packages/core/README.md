<<<<<<< HEAD
# Guide-Eazy - React 引导库

## 简介

Guide-Eazy 是一款专门为 React 应用设计的引导库，能够助力开发者便捷地构建交互式引导流程，有效提升用户对应用功能的认知度与操作熟练度，从而优化用户体验。
=======
# redux-azy

## Usage
>>>>>>> f63147e46aa1420ef69bf1a40ddadb95d3c8612f

### install

```shell
pnpm i guide-eazy
```

## 核心亮点

-   支持 JSX 自定义渲染
-   完备的类型支持
-   JSON 配置
-   支持异步引导，跨越路由
-   方便定位引导点 - GuideHook 插眼
-   支持强化的 Guide ref，直接可用，没有任何心智负担

## demo

就做两件事

-   创建一个 Provider

```jsx
"use client";

import { Card } from "antd";
import {
	GuideCoreProvider,
	GuideHook as GuideHookBase,
	useGuideRef,
} from "guide-eazy";
import "guide-eazy/dist/style.css";
import { PropsWithChildren, useEffect } from "react";

export type GuideId = "start" | "step1_1" | "step1_2" | "step1_3";

const GuideProvider = ({ children }: PropsWithChildren) => {
	const guideIns = useGuideRef();

	useEffect(() => {
		guideIns.current?.drive();
	}, []);
	return (
		<GuideCoreProvider<GuideId>
			guideIns={guideIns}
			steps={{
				showProgress: true,
				steps: [
					{
						id: "start",
						customPopRender({ api }) {
							return (
								<Card
									style={{
										position: "relative",
										bottom: 50,
										padding: "32px",
										fontSize: "30px",
										fontWeight: "bold",
									}}
									onClick={() => {
										api.setGuideIndex(1);
									}}
								>
									欢迎来到闲D岛🏝️
								</Card>
							);
						},
					},
				],
			}}
		>
			{children}
		</GuideCoreProvider>
	);
};
export const GuideHook = GuideHookBase<GuideId>;
export default GuideProvider;
```

-   然后就是“插眼”

```jsx
function TestNode({ id, item }: NavItemProps) {
	return (
		<Button>
			...
			<GuideHook readyId={"step1_1"} />
			...
		</Button>
	);
}
```

## API 文档

-   GuideCoreProvider

    -   Props:
        -   guideIns: 引导实例对象，用于控制引导流程的启动、暂停等操作。
        -   steps: 引导步骤的配置对象，包含以下属性：
        -   showProgress: 布尔值，是否显示引导进度，默认为 false。
        -   steps: 引导步骤数组，每个步骤是一个包含以下属性的对象：
            -   id: 步骤的唯一标识，用于在引导流程中识别和定位步骤。
            -   customPopRender: 自定义弹出内容渲染函数，接收一个包含 api 的对象，通过 api 可以控制引导流程的进度，如切换到下一个步骤等。

-   GuideHook
    -   Props:
        -   readyId: 字符串，用于标记引导点的唯一标识，与引导步骤中的 id 相对应，以便在引导流程中准确找到目标组件。

## 贡献指南

我们热忱欢迎广大开发者积极参与 Guide-Eazy 的开发与优化工作。如果您在使用过程中发现任何问题，或者有新颖的功能创意与建议，请毫不犹豫地提交 issue 或者 pull request 到项目的 GitHub 仓库。您的每一份贡献都将为项目的持续发展注入强大动力，共同打造更加出色的 React 引导库。

## 许可证

Guide-Eazy 采用 MIT 许可证发布，这意味着您可以在遵循许可证条款的前提下，自由地使用、修改和分发本库。无论是个人项目还是商业应用，都能够充分利用 Guide-Eazy 的强大功能，为用户带来卓越的引导体验。
借助 Guide-Eazy，您能够在 React 应用开发中迅速搭建起高效、灵活且用户友好的引导系统，显著提升用户对应用功能的理解与掌握程度，为应用的成功推广与广泛使用奠定坚实基础。
