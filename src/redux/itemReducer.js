import { ADD_ITEM, CANCEL_EDIT, DELETE_ITEM, EDIT_ITEM, LOAD_ITEMS_FROM_LOCALSTORAGE, SET_FILTER, UPDATE_ITEM } from "./actions";


const initialState = {
	items: [],
	editingItem: null,
	filter: '',
};

// @ts-ignore
const itemReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ITEM:
			return {
				...state,
				items: [...state.items, action.payload],
			};
		case EDIT_ITEM:
			return {
				...state,
				editingItem: action.payload,
			};
		case DELETE_ITEM:
			return {
				...state,
				items: state.items.filter(item =>
					item !== action.payload
				)
			};
		case UPDATE_ITEM:
			return {
				...state,
				items: state.items.map(item =>
					// @ts-ignore
					item.id === action.payload.id ? action.payload : item
				),
				editingItem: null,
			};
		case CANCEL_EDIT:
			return {
				...state,
				editingItem: null,
			};
		case LOAD_ITEMS_FROM_LOCALSTORAGE:
			return {
				...state,
				items: action.payload,
			};
		case SET_FILTER:
			return {
				...state,
				filter: action.payload,
			}
		default:
			return state;
	}
};

export default itemReducer;
