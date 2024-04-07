import { v4 as uuidv4 } from "uuid";

export default function addTempChat(position, tempChats, dispatch) {
	dispatch({
		type: "SET_TEMP_CHATS",
		tempChats: [
			...tempChats,
			{
				_id: uuidv4(),
				position,
			},
		],
	});
}
