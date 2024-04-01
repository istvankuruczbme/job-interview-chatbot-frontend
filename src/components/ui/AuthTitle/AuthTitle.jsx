import "./AuthTitle.css";
import PropTypes from "prop-types";

function AuthTitle({ className, children, ...props }) {
	return (
		<h2 className={`authTitle${className ? ` ${className}` : ""}`} {...props}>
			{children}
		</h2>
	);
}

AuthTitle.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default AuthTitle;
