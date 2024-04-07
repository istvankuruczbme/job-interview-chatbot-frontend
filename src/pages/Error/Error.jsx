import { Link, useLocation } from "react-router-dom";
import "./Error.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

function Error() {
	const location = useLocation();
	const { error } = location.state;

	console.log(location.state);

	if (error) {
		return (
			<div className="error">
				<div className="error__inner">
					{error.code === "chat/not-authorized" && (
						<>
							<FontAwesomeIcon icon={faBan} className="error__icon" />
							<p className="error__message">{error.message}</p>
							<p className="error__return">
								<Link to="/chats">Click here</Link> to return to your chats.
							</p>
						</>
					)}
				</div>
			</div>
		);
	}
}

export default Error;
