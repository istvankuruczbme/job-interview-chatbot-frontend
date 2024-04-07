import axios from "../../config/axios";

export default async function addChatToDB(chat) {
	try {
		// Create the chat in the server
		const { data } = await axios.post("/chats", chat);

		return data;
	} catch (e) {
		console.log("Error creating the new chat in the DB: \n", e);
		return e;
	}
}
