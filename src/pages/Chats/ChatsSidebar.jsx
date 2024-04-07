/* eslint-disable no-mixed-spaces-and-tabs */
import PropTypes from "prop-types";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/form/Input/Input";
import Button from "../../components/ui/Button/Button";
import { useState } from "react";
import ChatRow from "../../components/ui/ChatRow/ChatRow";
import checkIfMobileDevice from "../../utils/checkIfMobileDevice";
import createNewChat from "../../utils/chat/createNewChat";
import { useStateValue } from "../../contexts/context API/StateProvider";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/ui/Loader/Loader";
import "./ChatsSidebar.css";
import MobileSidebar from "../../components/layout/MobileSidebar/MobileSidebar";

function ChatsSidebar({ chats, loading, setRefreshChats }) {
	const isMobileDevice = checkIfMobileDevice();

	const [{ user }, dispatch] = useStateValue();
	const [showSidebar, setShowSidebar] = useState(!isMobileDevice);
	const [position, setPosition] = useState("");
	const navigate = useNavigate();

	const disableStartNewChat = position === "";

	return (
		<MobileSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
			<section className="chatsSidebar__newChat">
				<h2 className="chatsSidebar__title">Start new chat</h2>

				<form
					className="chatsSidebar__newChat__form"
					onSubmit={(e) => createNewChat(e, position, setPosition, user._id, setRefreshChats, navigate, dispatch)}>
					<Input
						type="text"
						id="newChatPosition"
						label="Position"
						placeholder="My position"
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
					{!loading ? (
						chats.map((chat) => (
							<ChatRow key={chat._id} id={chat._id} position={chat.position} setRefreshChats={setRefreshChats} />
						))
					) : (
						<Loader text="Loading positions..." />
					)}
				</div>
			</section>
		</MobileSidebar>
	);
}

ChatsSidebar.propTypes = {
	chats: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	setRefreshChats: PropTypes.func.isRequired,
};

export default ChatsSidebar;
