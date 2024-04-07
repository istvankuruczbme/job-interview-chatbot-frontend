import "./Delimiter.css";
import PropTypes from "prop-types";

function Delimiter({ className, text, line = true }) {
	return (
		<div
			data-text={text}
			className={`delimiter${className ? ` ${className}` : ""}${line ? " delimiter--line" : ""}`}></div>
	);
}

Delimiter.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	line: PropTypes.bool,
};

export default Delimiter;
