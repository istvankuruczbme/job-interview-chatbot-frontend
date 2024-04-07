import "./Loader.css";
import PropTypes from "prop-types";

function Loader({ className, text }) {
	return (
		<div className={`loader${className ? ` ${className}` : ""}`}>
			<div className="loader__inner">
				<div className="loader__spinner"></div>
				{text && <span className="loader__text">{text}</span>}
			</div>
		</div>
	);
}

Loader.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
};

export default Loader;
