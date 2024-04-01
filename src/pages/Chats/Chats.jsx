import ChatsSidebar from "./ChatsSidebar";
import Chat from "./Chat";
import "./Chats.css";
import checkIfMobileDevice from "../../utils/checkIfMobileDevice";

function Chats() {
	const isMobileDevice = checkIfMobileDevice();

	return (
		<div className={`chats${isMobileDevice ? " chats--mobile" : ""}`}>
			<ChatsSidebar />
			<Chat />
		</div>
	);
}

export default Chats;
