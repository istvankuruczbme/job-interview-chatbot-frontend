import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ChatRow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

function ChatRow({ id, position, className }) {
	function deleteChat(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	return (
		<Link to={id} className={`chatRow${className ? ` ${className}` : ""}`}>
			<span className="chatRow__position" title={position}>
				{position}
			</span>

			<FontAwesomeIcon icon={faTrashAlt} title="Delete chat" className="chatRow__delete" onClick={deleteChat} />
		</Link>
	);
}

ChatRow.propTypes = {
	id: PropTypes.string.isRequired,
	position: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default ChatRow;
