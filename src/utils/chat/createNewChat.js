import addMessageToDB from "../message/addMessageToDB";
import addChatToDB from "./addChatToDB";

export default async function createNewChat(e, position, setPosition, userId, setRefreshChats, navigate, dispatch) {
	e.preventDefault();

	position = position.trim().toLowerCase();
	try {
		// Add the chat to the DB
		const chat = await addChatToDB({ position, userId });

		if (!chat) {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message: "This position already exists in your chats.",
					details: "Select a different position to start a new chat.",
				},
			});
			return;
		}

		// Add the first message of the chat to the DB
		await addMessageToDB({
			timestamp: new Date(),
			chatId: chat._id,
		});

		// Refresh the chats if needed
		if (setRefreshChats) setRefreshChats((prev) => !prev);
		// Delete the value of the input field
		if (setPosition) setPosition("");

		navigate(`/chats/${chat._id}`);
	} catch (e) {
		console.log("Error creating chat:\n", e);
	}
}
