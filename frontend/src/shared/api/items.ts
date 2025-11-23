import axios from "axios";
import { env } from "../helper/env";
import type { Item } from "../types/items";

const BASE_API = env.VITE_SERVER_URL + 'items';

type GetItemsProps = {
	offset: number;
	limit: number;
	signal?: AbortSignal;
};

export const getItems = async ({ offset, limit, signal }: GetItemsProps) => {
	const items = await axios.get<Item[]>(BASE_API, {
		params: {
			offset,
			limit,
		},
		signal,
	});
	return items.data;
};