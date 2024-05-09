/* Instruments */
import { createThunks } from "../../setup";
import names from "../names";
import httpApi from "./api";

const thunks = createThunks(names.appStore, {
	testAct: async (arg: { id: string }) => {
		const { data } = await httpApi.geoQueryApi(arg);
	},
});
export default thunks;
