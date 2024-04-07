import addMessageToDB from "./addMessageToDB";

export default async function createNewMessage(e, chatId, prompt, setMessage, setIsThinking, setMessages) {
	e.preventDefault();

	try {
		// Show Thinking message
		setIsThinking(true);

		// Add the message to the DB
		const messages = await addMessageToDB({
			prompt,
			timestamp: new Date().toISOString(),
			chatId,
		});

		// Remove Thinking message
		setIsThinking(false);

		// Clear the textarea
		setMessage("");

		// Add the 2 new messages
		setMessages((prev) => [...prev, ...messages.map((message) => ({ ...message, isNew: true }))]);
	} catch (e) {
		console.log("Error adding message:\n", e);
	}
}
