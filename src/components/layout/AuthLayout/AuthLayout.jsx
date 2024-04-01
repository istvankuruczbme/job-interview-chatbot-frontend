import "./AuthLayout.css";
import PropTypes from "prop-types";

function AuthLayout({ className, children }) {
	return (
		<div className={`authLayout${className ? ` ${className}` : ""}`}>
			<div className="authLayout__inner">{children}</div>
		</div>
	);
}

AuthLayout.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default AuthLayout;
