import "./CancelSaveButtons.css";
import PropTypes from "prop-types";

function CancelSaveButtons({ className, children }) {
	return <div className={`cancelSaveButtons${className ? ` ${className}` : ""}`}>{children}</div>;
}

CancelSaveButtons.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default CancelSaveButtons;
