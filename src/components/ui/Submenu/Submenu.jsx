import "./Submenu.css";
import PropTypes from "prop-types";

function Submenu({ className, children }) {
	return <ul className={`submenu${className ? ` ${className}` : ""}`}>{children}</ul>;
}

Submenu.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Submenu;
