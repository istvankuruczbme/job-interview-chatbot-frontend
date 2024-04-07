import { forwardRef } from "react";
import "./Button.css";
import PropTypes from "prop-types";

const Button = forwardRef(({ className, variant, outlined, centered, fullWidth, circle, children, ...props }, ref) => {
	return (
		<button
			ref={ref}
			className={`button${className ? ` ${className}` : ""}${variant ? ` button--${variant}` : ""}${
				outlined ? " button--outlined" : ""
			}${centered ? " button--centered" : ""}${fullWidth ? " button--full" : ""}${circle ? " button--circle" : ""}`}
			{...props}>
			{children}
		</button>
	);
});

Button.displayName = "Button";

Button.propTypes = {
	className: PropTypes.string,
	variant: PropTypes.oneOf(["primary", "accent", "accentLight", "red"]),
	outlined: PropTypes.bool,
	centered: PropTypes.bool,
	fullWidth: PropTypes.bool,
	circle: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default Button;
