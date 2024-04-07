import PropTypes from "prop-types";
import { useStateValue } from "../../../contexts/context API/StateProvider";
import { userDefaultPhotoUrl } from "../../../assets/userDefaultPhotoUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import formatDate from "../../../utils/formatters/formatDate";
import { Fragment } from "react";
import "./Message.css";

function Message({ role, content, timestamp, isNew, isThinking }) {
	const [{ user }] = useStateValue();

	// Convert time string into a Date object
	timestamp = new Date(timestamp);

	return (
		<div
			className={`message ${role === "assistant" ? "message--assistant" : "message--user"}${
				isThinking ? " message--thinking" : ""
			}`}>
			{role === "assistant" && <FontAwesomeIcon icon={faRobot} title="Chatbot" className="message__robot" />}

			<div className="message__main">
				<span className="message__timestamp">
					{role === "assistant" ? "Chatbot" : "You"} - {formatDate(timestamp, { weekday: "narrow" })}{" "}
					{formatDate(timestamp, { hour: "numeric", minute: "numeric" })}
					{" / "}
					{formatDate(timestamp, { dateStyle: "short" })}
				</span>
				<p className={`message__content${isNew ? " message__content--typing" : ""}`}>
					{content.split("\n").map((line, i) => (
						<Fragment key={i}>
							{line}
							{i !== content.split("\n").length - 1 && <br />}
						</Fragment>
					))}
				</p>
			</div>

			{role === "user" && (
				<img
					src={user?.photoUrl ? user.photoUrl : userDefaultPhotoUrl}
					alt={user?.name}
					title={user?.name}
					className="message__img"
				/>
			)}
		</div>
	);
}

Message.propTypes = {
	role: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	timestamp: PropTypes.string.isRequired,
	isNew: PropTypes.bool,
	isThinking: PropTypes.bool,
};

export default Message;
