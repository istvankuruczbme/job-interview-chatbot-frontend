import { faAngleLeft, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/form/Input/Input";
import "./ChatsSidebar.css";
import Button from "../../components/ui/Button/Button";
import { useState } from "react";
import ChatRow from "../../components/ui/ChatRow/ChatRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import checkIfMobileDevice from "../../utils/checkIfMobileDevice";

function ChatsSidebar() {
	const isMobileDevice = checkIfMobileDevice();

	const [showSidebar, setShowSidebar] = useState(!isMobileDevice);
	const [position, setPosition] = useState("");

	const disableStartNewChat = position === "";

	return (
		<div className={`chatsSidebar${showSidebar ? " chatsSidebar--show" : ""}`}>
			<div
				className="chatsSidebar__collapse"
				title={`${showSidebar ? "Hide" : "Show"} sidebar`}
				onClick={() => setShowSidebar((prev) => !prev)}>
				<FontAwesomeIcon icon={faAngleLeft} />
			</div>

			<section className="chatsSidebar__newChat">
				<h2 className="chatsSidebar__title">Start new chat</h2>

				<form className="chatsSidebar__newChat__form" onSubmit={() => console.log("New chat form submitted.")}>
					<Input
						type="text"
						id="newChatPosition"
						label="Position"
						placeholder="Your position"
						icon={faUserDoctor}
						fullWidth
						required
						value={position}
						onChange={(e) => setPosition(e.target.value)}
					/>

					<Button
						type="submit"
						fullWidth
						className="chatsSidebar__newChat__form__submit"
						title="Start new chat"
						disabled={disableStartNewChat}>
						Start
					</Button>
				</form>
			</section>

			<section className="chatsSidebar__prevChats">
				<h2 className="chatsSidebar__title">Previous chats</h2>

				<div className="chatsSidebar__prevChats__container">
					<ChatRow id="1" position="alma alma alma alma alma alma" />
					<ChatRow id="1" position="alma" />
				</div>
			</section>
		</div>
	);
}

export default ChatsSidebar;
