import PropTypes from "prop-types";
import "./Container.css";

function Container({ className, zeroPadding = false, maxWidth = 1200, children, ...props }) {
	return (
		<div
			className={`container${className ? ` ${className}` : ""}${zeroPadding ? " container--zeroPadding" : ""}`}
			style={{ "--maxWidth": `${maxWidth}px` }}
			{...props}>
			{children}
		</div>
	);
}

Container.propTypes = {
	className: PropTypes.string,
	zeroPadding: PropTypes.bool,
	maxWidth: PropTypes.number,
	children: PropTypes.node.isRequired,
};

export default Container;
