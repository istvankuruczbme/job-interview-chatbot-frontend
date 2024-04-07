import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/form/Input/Input";
import "./ChatsIntro.css";
import Button from "../../components/ui/Button/Button";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import createNewChat from "../../utils/chat/createNewChat";
import { useStateValue } from "../../contexts/context API/StateProvider";

function ChatsIntro() {
	const [{ user }, dispatch] = useStateValue();
	const { chats, setRefreshChats } = useOutletContext();
	const [position, setPosition] = useState("");
	const navigate = useNavigate();

	const disableSubmit = position === "";

	return (
		<div className="chatsIntro">
			<div className="chatsIntro__inner">
				<h2 className="chatsIntro__title">Start a new chat</h2>
				<p className="chatsIntro__p">Just enter the position you are going to in the box below and click Go.</p>
				<form
					className="chatsIntro__newChat"
					onSubmit={(e) => createNewChat(e, position, undefined, user._id, setRefreshChats, navigate, dispatch)}>
					<Input
						type="text"
						id="chatsIntroNewChat"
						label="Position"
						placeholder="My position"
						icon={faUserDoctor}
						className="chatsIntro__newChat__input"
						fullWidth
						value={position}
						onChange={(e) => setPosition(e.target.value)}
					/>
					<Button type="submit" disabled={disableSubmit}>
						Go
					</Button>
				</form>

				<h3 className="chatsIntro__subtitle">Select a previous chat</h3>
				<p className="chatsIntro__p">By selecting a previous chat you can continue the conversation.</p>
				<p className="chatsIntro__p">You can find these chats in the sidebar or here is your last 3.</p>
				<div className="chatsIntro__prevChats">
					{chats.toSpliced(3).map((chat) => (
						<Button
							key={chat._id}
							className="chatsIntro__prevChats__button"
							onClick={() => navigate(`${chat._id}`)}>
							{chat.position}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

export default ChatsIntro;
