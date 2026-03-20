import {
	createContext,
	MutableRefObject,
	PropsWithChildren,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { GuideIns, GuideProps, useGuide } from "./useGuide";

// 创建一个 Context
export type GuideContextState<T extends string = any> = {
	[key in T]?: boolean;
};
export interface GuideApi<T extends string = any> {
	currentGuideIndex: number;
	setGuideIndex: React.Dispatch<React.SetStateAction<number>>;
	readyList: GuideContextState<T>;
	setReadyList: React.Dispatch<React.SetStateAction<GuideContextState>>;
	overList: GuideContextState<T>;
	setOverList: React.Dispatch<React.SetStateAction<GuideContextState>>;
}
const MyContext = createContext<GuideApi | undefined>(undefined);

export const GuideCoreProvider = <T extends string = any>(
	props: PropsWithChildren<{
		guideIns: MutableRefObject<GuideIns | undefined>;
		steps: GuideProps<T>;
	}>
) => {
	const runFlag = useRef(false);
	const { steps, guideIns } = props;
	const [currentGuideIndex, setGuideIndex] = useState(0);
	// 准备
	const [readyList, setReadyList] = useState({});
	// 完成
	const [overList, setOverList] = useState({});
	const { children } = props;
	const api = {
		readyList,
		setReadyList,
		currentGuideIndex,
		setGuideIndex,
		overList,
		setOverList,
	};

	const infoIns = useGuide<T>(steps, api);

	guideIns.current = infoIns!;
	useEffect(() => {
		const { onDeselected, onPrevClick } = steps;
        if(onPrevClick){

        }
		if (onDeselected) {
			steps.onDeselected = (...args) => {
				onDeselected?.(...args);
				const activeStep = infoIns?.getActiveIndex() || 0;
				let step = args[2].config!?.steps!?.[activeStep] || {};
				//@ts-ignore
				const { id } = step;
				if (id) {
					setOverList((prevState) => ({
						...prevState,
						[id]: true,
					}));
				}
			};
		} else {
			steps.onDeselected = (...args) => {
				const activeStep = infoIns?.getActiveIndex() || 0;
				let step = args[2].config!?.steps!?.[activeStep] || {};
				//@ts-ignore
				const { id } = step;
				if (id) {
					setOverList((prevState) => ({
						...prevState,
						[id]: true,
					}));
				}
			};
		}
	}, []);
	useEffect(() => {
		if (infoIns?.getConfig()!?.steps!?.length == currentGuideIndex) {
			infoIns?.destroy();
		}
		const activeStep = currentGuideIndex || 0;
		let step = infoIns?.getConfig()!?.steps!?.[activeStep] || {};
		if (!step) {
			return;
		}
		//@ts-ignore
		if (overList[step.id]) {
			return;
		}
		//@ts-ignore
		const isReady = readyList[step.id];
		//@ts-ignore
		const isOver = overList[step.id];
		if (currentGuideIndex == 0 && runFlag.current) return;
		//@ts-ignore
		if (!step.id) {
			if (!runFlag.current) {
				infoIns?.drive();
				runFlag.current = true;
			} else {
				infoIns!?.moveTo(currentGuideIndex);
			}
		} else if (isReady && !isOver) {
			if (!runFlag.current) {
				infoIns?.drive();
				runFlag.current = true;
			} else {
				infoIns!?.moveTo(currentGuideIndex);
			}
		}
	}, [readyList, currentGuideIndex]);

	return <MyContext.Provider value={api}>{children}</MyContext.Provider>;
};

// 自定义 Hook 用于方便地使用 Context
export const useGuideContext = <T extends string = any>() => {
	const context = useContext(MyContext);
	if (!context) {
		throw new Error("useMyContext must be used within a MyProvider");
	}
	return context as GuideApi<T>;
};
