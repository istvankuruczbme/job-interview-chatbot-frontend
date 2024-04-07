import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./ChatRow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useStateValue } from "../../../contexts/context API/StateProvider";
import deleteChat from "../../../utils/chat/deleteChat";

function ChatRow({ id, position, setRefreshChats, className }) {
	const [, dispatch] = useStateValue();
	const navigate = useNavigate();

	return (
		<Link to={id} className={`chatRow${className ? ` ${className}` : ""}`}>
			<span className="chatRow__position" title={position}>
				{position}
			</span>

			<FontAwesomeIcon
				icon={faTrashAlt}
				title="Delete chat"
				className="chatRow__delete"
				onClick={(e) => deleteChat(e, id, setRefreshChats, navigate, dispatch)}
			/>
		</Link>
	);
}

ChatRow.propTypes = {
	id: PropTypes.string.isRequired,
	position: PropTypes.string.isRequired,
	setRefreshChats: PropTypes.func.isRequired,
	className: PropTypes.string,
};

export default ChatRow;
