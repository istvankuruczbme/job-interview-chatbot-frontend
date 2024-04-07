import axios from "../../config/axios";

export default async function deleteChatFromDB(chatId) {
	try {
		// Delete the chat from the server
		const { data } = await axios.delete(`/chats/${chatId}`);

		return data;
	} catch (e) {
		console.log("Error deleting the chat from the DB: \n", e);
		return e;
	}
}
