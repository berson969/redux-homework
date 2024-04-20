import React, { useEffect, useState } from 'react';
import "../index.css";
import { useSelector, useDispatch } from 'react-redux';
import {DELETE_ITEM, EDIT_ITEM, LOAD_ITEMS_FROM_LOCALSTORAGE} from "../redux/actions.js";

export const ItemList = () => {
	// @ts-ignore
	const { items, filter } = useSelector((state) => state.itemsReducer);
	const dispatch = useDispatch();
	const [filteredItems, setFilteredItems] = useState(items);

	useEffect(() => {
		// @ts-ignore
		const storedItems = JSON.parse(window.localStorage.getItem('items'));
		if (storedItems) {
			dispatch({
				type: LOAD_ITEMS_FROM_LOCALSTORAGE,
				payload: storedItems
			});
		}
	}, [dispatch]);

	useEffect(() => {
		window.localStorage.setItem('items', JSON.stringify(items));
	}, [items]);

	useEffect(() => {
		const filtered = filter
			// @ts-ignore
			? items.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
			: items;
		setFilteredItems(filtered);
	}, [items, filter])

	// @ts-ignore
	const handleEdit = item => {
		dispatch({
			type: EDIT_ITEM,
			payload: item
		});
	};

	// @ts-ignore
	const handleDelete = item => {
		dispatch({
			type: DELETE_ITEM,
			payload: item
		});
	};

	return (
		<div className="overflow-x-auto flex justify-center mx-36">
			<table className="w-full table-auto border border-gray-500 min-w-min max-w-max">
				<thead>
					<tr>
						<th className="border border-gray-500 px-4 py-2">Title</th>
						<th className="border border-gray-500 px-16 py-2">Price</th>
						<th className="border border-gray-500 px-16 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
				{filteredItems.map(
// @ts-ignore
				item => (
					<tr key={item.id}>
						<td className="w-[400px] border border-gray-500 px-4 py-2">{item.title}</td>
						<td className="border border-gray-500 px-16 py-2">{item.price}</td>
						<td className="border border-gray-500 px-16 py-2 ">
							<button className="btn btn-primary w-7 h-7 pr-6" onClick={() => handleEdit(item)}>
								<i className="bi bi-pencil"></i>
							</button>
							<button className="btn btn-danger w-7 h-7" onClick={() => handleDelete(item)}>
								<i className="bi bi-trash"></i>
							</button>
						</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
};


