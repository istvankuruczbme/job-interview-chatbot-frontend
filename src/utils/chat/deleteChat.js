import deleteChatFromDB from "./deleteChatFromDB";

export default async function deleteChat(e, chatId, setRefreshChats, navigate, dispatch) {
	if (e) {
		e.preventDefault();
		e.stopPropagation();
	}

	const confirm = window.confirm("Are you sure you want to delete this chat?");
	if (!confirm) return;

	try {
		await deleteChatFromDB(chatId);

		setRefreshChats((prev) => !prev);
		navigate("/chats");
	} catch (e) {
		console.log("Error deleting chat:\n", e);

		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				show: true,
				type: "error",
				message: "An error happend while deleting the chat.",
				details: "Try again later.",
			},
		});
	}
}
