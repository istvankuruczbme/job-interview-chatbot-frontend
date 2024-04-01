import { useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import autosize from "autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../ui/Button/Button";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./MessageInput.css";

function MessageInput({ chatId }) {
	const formRef = useRef();
	const textAreaRef = useRef();

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
			formRef.current.submit();
		}
	}

	return (
		<form ref={formRef} className="messageInput" onSubmit={() => console.log("Message send form submitted.")}>
			<div className="messageInput__inner">
				<textarea
					ref={textAreaRef}
					type="text"
					placeholder="Type your question"
					className="messageInput__input"
					onKeyDown={handleKeydown}></textarea>

				<Button type="submit" circle className="messageInput__submit">
					<FontAwesomeIcon icon={faPaperPlane} />
				</Button>
			</div>
		</form>
	);
}

MessageInput.propTypes = {
	chatId: PropTypes.string.isRequired,
};

export default MessageInput;
