/**
 * 仓库的状态集合
 */
export interface SliceState {
	title: string;
	dataList: DataItem[];
	pagination: Pagination;
}

/**
 * 翻页信息
 */
export interface Pagination {
	pageNum: number;
	pageSize: number;
	total: number;
}

/**
 * 个体类型
 */
export interface DataItem {
	id: number;
	title: string;
}

/**
 * QueryApi-请求参数
 */
export type QueryApiParams = Partial<Pagination>;

/**
 * QueryApi-返回参数
 */
export interface QueryApiRes {
	data: {
		list: DataItem[];
		total: number;
	};
}
