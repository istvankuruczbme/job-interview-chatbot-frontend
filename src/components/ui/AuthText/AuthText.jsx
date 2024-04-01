import "./AuthText.css";
import PropTypes from "prop-types";

function AuthText({ className, children }) {
	return <p className={`authText${className ? ` ${className}` : ""}`}>{children}</p>;
}

AuthText.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default AuthText;
