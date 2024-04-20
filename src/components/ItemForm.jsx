import React, {useEffect, useState } from 'react';
import "../index.css";
import {useDispatch, useSelector } from 'react-redux';
import {ADD_ITEM, CANCEL_EDIT, SET_FILTER, UPDATE_ITEM} from "../redux/actions.js";

export const ItemForm = () => {
    // @ts-ignore
    const { items, editingItem }  = useSelector((state) => state.itemsReducer);
    const dispatch = useDispatch();

    const [title, setTitle] = useState(editingItem ? editingItem.title : '');
    const [price, setPrice] = useState(editingItem ? editingItem.price : '');
    const [filter, setFilter] = useState('')

    useEffect(() => {
        if (editingItem) {
            setTitle(editingItem.title);
            setPrice(editingItem.price);
        }
    }, [editingItem]);

    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !price.trim()) return;
        // @ts-ignore
        if (editingItem && items.find(item => item.id === editingItem.id)) {
            dispatch({
				type: UPDATE_ITEM,
				payload: {
                    ...editingItem,
                    title,
                    price
                }
			})
        } else {
            dispatch({
                type: ADD_ITEM,
                payload: {
                    id: crypto.randomUUID(),
                    title: title,
                    price: price
                }
            })

        }

        setTitle('');
        setPrice('');
	}

    const handleCancel = () => {
        dispatch({
			type: CANCEL_EDIT,
			});
        setTitle('');
        setPrice('');
	}

    // @ts-ignore
    const handleFilter = (e) => {
        setFilter(e.target.value)
        dispatch({
            type: SET_FILTER,
            payload: e.target.value,
        });
    }

    return (
		<div className="my-24 mx-36 shadow-lg rounded">
			<form onSubmit={handleSubmit} className="flex gap-4 justify-center mx-auto bg-white  p-8">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="shadow appearance-none border rounded w-[400px] py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                    type="number"
                    value={price}
                    min="0"
                    step="100"
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="shadow appearance-none border rounded w-56  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <div className="flex items-center justify-between gap-3">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded focus:outline-none focus:shadow-outline"
                    >
                        {editingItem ? 'Save' : 'Add'}
                    </button>
                    {editingItem && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    )}
                </div>
			</form>
            <div className="flex gap-4 justify-center mx-auto bg-white  p-8">
                <input
                    type="text"
                    value={filter}
                    onChange={handleFilter}
                    placeholder="Filter by title"
                    className="shadow appearance-none border rounded w-56  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
		</div>
	)
}
