import PropTypes from "prop-types";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import deleteChat from "../../utils/chat/deleteChat";
import { useStateValue } from "../../contexts/context API/StateProvider";
import { useNavigate } from "react-router-dom";
import "./ChatHeader.css";
import { faEllipsisV, faQuestion } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../components/ui/IconButton/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Submenu from "../../components/ui/Submenu/Submenu";

function ChatHeader({ id, position, setRefreshChats }) {
	const [, dispatch] = useStateValue();
	const navigate = useNavigate();

	return (
		<div className="chatHeader">
			<span className="chatHeader__position" title={position}>
				{position}
			</span>

			<div className="chatHeader__right">
				<div className="chatHeader__more">
					<IconButton icon={faEllipsisV} title="Settings" />

					<Submenu className="chatHeader__settings">
						{/* <li className="chatHeader__menuitem" title="Hide Show Question button">
							<FontAwesomeIcon icon={faQuestion} className="chatHeader__menuitem__icon" />
							<span className="chatHeader__menuitem__text">Hide Show Question button</span>
						</li> */}
						<li
							className="chatHeader__menuitem chatHeader__menuitem--red"
							title="Delete chat"
							onClick={(e) => deleteChat(e, id, setRefreshChats, navigate, dispatch)}>
							<FontAwesomeIcon icon={faTrashAlt} className="chatHeader__menuitem__icon" />
							<span className="chatHeader__menuitem__text">Delete chat</span>
						</li>
					</Submenu>
				</div>
			</div>
		</div>
	);
}

ChatHeader.propTypes = {
	id: PropTypes.string.isRequired,
	position: PropTypes.string.isRequired,
	setRefreshChats: PropTypes.func.isRequired,
};

ChatHeader.defaultProps = {
	id: "",
	position: "",
};

export default ChatHeader;
