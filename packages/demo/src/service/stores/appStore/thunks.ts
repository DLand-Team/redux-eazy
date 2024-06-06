import { dp } from "../..";
import { createThunks } from "../../setup";
import names from "../names";
import httpApi from "./api";
import { QueryApiParams } from "./model";

const thunks = createThunks(names.appStore, {
	queryAct: async (arg: QueryApiParams, api) => {
		const { data } = await httpApi.queryApi({ ...arg });
		dp("appStore", "setDataList", data);
		return data;
	},
});
export default thunks;
