export const initialState = {
	user: null,
};

export default function reducer(state, action) {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};

		default:
			return "Invalid action type!";
	}
}
