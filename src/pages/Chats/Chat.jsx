import MessageInput from "../../components/form/Input/MessageInput";
import Container from "../../components/layout/Container/Container";
import "./Chat.css";
import ChatHeader from "./ChatHeader";

function Chat() {
	return (
		<Container className="chat" zeroPadding>
			<ChatHeader id="1" position="Alma" />

			<div className="chat__messages scrollbar">
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
				Chat <br />
			</div>

			<MessageInput chatId="1" />
		</Container>
	);
}

export default Chat;
