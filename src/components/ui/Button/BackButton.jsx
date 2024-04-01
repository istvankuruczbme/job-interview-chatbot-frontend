import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BackButton.css";
import PropTypes from "prop-types";
import Button from "./Button";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function BackButton({ link }) {
	const navigate = useNavigate();

	return (
		<Button variant="primary" circle title="Back" onClick={() => navigate(link)}>
			<FontAwesomeIcon icon={faAngleLeft} />
		</Button>
	);
}

BackButton.propTypes = {
	link: PropTypes.string.isRequired,
};

export default BackButton;
