import "./Delimiter.css";
import PropTypes from "prop-types";

function Delimiter({ className, text }) {
	return <div data-text={text} className={`delimiter${className ? ` ${className}` : ""}`}></div>;
}

Delimiter.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
};

export default Delimiter;
