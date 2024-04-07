import MessageInput from "../../components/form/Input/MessageInput";
import Container from "../../components/layout/Container/Container";
import Message from "../../components/ui/Message/Message";
import ChatHeader from "./ChatHeader";
import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import useChat from "../../hooks/useChat";
import useMessages from "../../hooks/useMessages";
import Button from "../../components/ui/Button/Button";
import Radio from "../../components/form/Radio/Radio";
import Loader from "../../components/ui/Loader/Loader";
import createNewMessage from "../../utils/message/createNewMessage";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";

function Chat() {
	const { chat, authenticated, loadingChat } = useChat();
	const { messages, setMessages, loadingMessages } = useMessages(authenticated);
	const { setRefreshChats } = useOutletContext();
	const [isThinking, setIsThinking] = useState(false);
	const [message, setMessage] = useState("");
	const basicLevelRef = useRef();
	const intermediateLevelRef = useRef();
	const advancedLevelRef = useRef();

	// Returns the selected question level
	function getQuestionLevel() {
		if (basicLevelRef.current.checked) return "basic";
		if (intermediateLevelRef.current.checked) return "intermediate";
		if (advancedLevelRef.current.checked) return "advanced";
		return "error";
	}

	return (
		<Container className="chat" zeroPadding>
			{loadingChat || loadingMessages ? (
				<Loader text="Loading the chat..." />
			) : (
				<>
					<ChatHeader id={chat?._id} position={chat?.position} setRefreshChats={setRefreshChats} />

					<ScrollToBottom className="chat__messages" followButtonClassName="chat__messages__follow">
						{messages.map((message) => (
							<Message
								key={message._id}
								role={message.role}
								content={message.content}
								timestamp={message.timestamp}
								isNew={message.isNew}
							/>
						))}
						{isThinking && (
							<Message
								role="assistant"
								content="Thinking..."
								timestamp={new Date().toISOString()}
								isThinking={isThinking}
							/>
						)}

						{messages?.length > 0 && (
							<div className="showQuestion">
								<Button
									centered
									className="showQuestion__button"
									onClick={(e) =>
										createNewMessage(
											e,
											chat._id,
											{
												type: "PROFESSIONAL_QUESTION",
												content: message.trim(),
												level: getQuestionLevel(),
											},
											setMessage,
											setIsThinking,
											setMessages
										)
									}>
									Show a question
								</Button>
								<div className="showQuestion__level">
									<Radio
										label="Basic"
										name="questionLevel"
										id="questionLevelBasic"
										ref={basicLevelRef}
										defaultChecked={true}
									/>
									<Radio
										label="Intermediate"
										name="questionLevel"
										id="questionLevelIntermediate"
										ref={intermediateLevelRef}
									/>
									<Radio
										label="Advanced"
										name="questionLevel"
										id="questionLevelAdvanced"
										ref={advancedLevelRef}
									/>
								</div>
							</div>
						)}
					</ScrollToBottom>

					<MessageInput
						message={message}
						setMessage={setMessage}
						setMessages={setMessages}
						setIsThinking={setIsThinking}
					/>
				</>
			)}
		</Container>
	);
}

export default Chat;
