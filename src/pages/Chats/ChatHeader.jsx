import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ChatHeader.css";
import PropTypes from "prop-types";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

function ChatHeader({ id, position }) {
	return (
		<div className="chatHeader">
			<span className="chatHeader__position" title={position}>
				{position}
			</span>

			<FontAwesomeIcon icon={faTrashAlt} className="chatHeader__delete" title="Delete chat" />
		</div>
	);
}

ChatHeader.propTypes = {
	id: PropTypes.string.isRequired,
	position: PropTypes.string.isRequired,
};

export default ChatHeader;
