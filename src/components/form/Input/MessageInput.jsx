import { useLayoutEffect, useRef } from "react";
import autosize from "autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../ui/Button/Button";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import createNewMessage from "../../../utils/message/createNewMessage";
import "./MessageInput.css";

function MessageInput({ message, setMessage, setMessages, setIsThinking }) {
	const formRef = useRef();
	const textAreaRef = useRef();
	const { chatId } = useParams();

	const disableSendMessage = message === "";

	// Automatically resize the textarea when the content changes.
	useLayoutEffect(() => {
		autosize(textAreaRef.current);

		function updateChatMessagesHeight() {
			const chatMessagesElement = document.querySelector(".chat__messages");
			chatMessagesElement.style.setProperty("--message-input-height", `${formRef.current.offsetHeight}px`);
		}

		const textArea = textAreaRef.current;
		textArea.addEventListener("autosize:resized", updateChatMessagesHeight);

		return () => textArea.removeEventListener("autosize:resized", updateChatMessagesHeight);
	}, []);

	// Submit the form when the user presses Enter inside the textarea.
	function handleKeydown(e) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			createNewMessage(
				e,
				chatId,
				{ type: "GENERAL_QUESTION", content: message.trim() },
				setMessage,
				setIsThinking,
				setMessages
			);
		}
	}

	return (
		<form
			ref={formRef}
			className="messageInput"
			onSubmit={(e) =>
				createNewMessage(
					e,
					chatId,
					{ type: "GENERAL_QUESTION", content: message.trim() },
					setMessage,
					setIsThinking,
					setMessages
				)
			}>
			<div className="messageInput__inner">
				<textarea
					ref={textAreaRef}
					type="text"
					placeholder="Type your question"
					className="messageInput__input"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleKeydown}></textarea>

				<Button type="submit" circle className="messageInput__submit" disabled={disableSendMessage}>
					<FontAwesomeIcon icon={faPaperPlane} />
				</Button>
			</div>
		</form>
	);
}

MessageInput.propTypes = {
	message: PropTypes.string.isRequired,
	setMessage: PropTypes.func.isRequired,
	setMessages: PropTypes.func.isRequired,
	setIsThinking: PropTypes.func.isRequired,
};

export default MessageInput;
