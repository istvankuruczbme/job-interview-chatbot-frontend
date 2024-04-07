import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./Radio.css";

const Radio = forwardRef(({ label, id, name, className, ...props }, ref) => {
	return (
		<div className={`radio${className ? ` ${className}` : ""}`}>
			<input ref={ref} type="radio" name={name} id={id} hidden className="radio__input" {...props} />

			<label htmlFor={id} className="radio__label">
				<span className="radio__button"></span>
				<span className="label__text">{label}</span>
			</label>
		</div>
	);
});

Radio.displayName = "Radio";

Radio.propTypes = {
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default Radio;
