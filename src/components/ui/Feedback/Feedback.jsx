import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateValue } from "../../../contexts/context API/StateProvider";
import "./Feedback.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect } from "react";

function Feedback({ time = 5 }) {
	const [{ feedback }, dispatch] = useStateValue();

	// Function to close and reset the feedback
	const closeFeedback = useCallback(() => {
		// First only slide up the feedback
		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				...feedback,
				show: false,
			},
		});

		// After it slides up, reset it
		setTimeout(() => {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: false,
					type: "info",
					message: "",
					details: "",
				},
			});
		}, 300);
	}, [dispatch, feedback]);

	// Automatically close the feedback after a certain time
	useEffect(() => {
		if (feedback.show) {
			const timer = setTimeout(closeFeedback, time * 1000);

			return () => clearTimeout(timer);
		}
	}, [closeFeedback, feedback.show, time]);

	return (
		<div className={`feedback${feedback.show ? " feedback--show" : ""} feedback--${feedback.type}`}>
			<header className="feedback__header">
				<h3 className="feedback__message">{feedback.message}</h3>
				<FontAwesomeIcon icon={faXmark} className="feedback__close" onClick={closeFeedback} />
			</header>
			{feedback.details !== "" && <p className="feedback__details">{feedback.details}</p>}
		</div>
	);
}

Feedback.propTypes = {
	time: PropTypes.number,
};

export default Feedback;
