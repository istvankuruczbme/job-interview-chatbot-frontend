import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./Switch.css";

const Switch = forwardRef(({ className, id, labelLeft, labelRight, ...props }, ref) => {
	return (
		<div className={`switch${className ? ` ${className}` : ""}`}>
			<input ref={ref} type="checkbox" id={id} hidden className="switch__input" {...props} />

			<label htmlFor={id} className="switch__label">
				<span className="switch__label__text">{labelLeft}</span>
				<span className="switch__button"></span>
				<span className="switch__label__text">{labelRight}</span>
			</label>
		</div>
	);
});

Switch.displayName = "Switch";

Switch.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
	labelLeft: PropTypes.string.isRequired,
	labelRight: PropTypes.string.isRequired,
};

export default Switch;
