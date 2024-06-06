import { QueryApiParams, QueryApiRes } from "./model";

const api = {
	queryApi(params: QueryApiParams) {
		return Promise.resolve<QueryApiRes>({
			data: {
				list: [{ id: 1, title: "item1" }],
				total: 100,
			},
		});
	},
};

export default api;
