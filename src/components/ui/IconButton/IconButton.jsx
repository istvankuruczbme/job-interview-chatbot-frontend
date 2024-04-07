import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./IconButton.css";
import PropTypes from "prop-types";

function IconButton({ className, icon, ...props }) {
	return (
		<FontAwesomeIcon
			icon={icon}
			className={`iconButton${className ? ` ${className}` : ""}`}
			tabIndex={0}
			{...props}
		/>
	);
}

IconButton.propTypes = {
	className: PropTypes.string,
	icon: PropTypes.object.isRequired,
};

export default IconButton;
