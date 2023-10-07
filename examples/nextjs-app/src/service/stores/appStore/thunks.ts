/* Instruments */
import { dp } from "@/service";
import { createThunks } from "@/service/setup";
import names from "../names";
import httpApi from "./api";

const thunks = createThunks(names.appStore, {
	testAct: async (arg: { id: string }, api) => {
		const { data } = await httpApi.geoQueryApi(arg);
		dp("appStore", "setAppInfo", data.info);
	},
});
export default thunks;
