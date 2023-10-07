function geoQueryApi(params: { id: string }) {
	return Promise.resolve({ data: { info: "yes" } });
}

const api = {
	geoQueryApi,
};

export default api;
