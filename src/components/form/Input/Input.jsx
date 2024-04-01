import { forwardRef, useState } from "react";
import "./Input.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../../layout/Container/Container";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Input = forwardRef(({ className, fullWidth, label, type = "text", id, icon, ...props }, ref) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className={`input${fullWidth ? " input--full" : ""}`}>
			<label htmlFor={id} className="input__label">
				{label}
			</label>
			<Container zeroPadding className="input__container">
				<input
					ref={ref}
					type={showPassword ? "text" : type}
					id={id}
					className={`input__input${className ? ` ${className}` : ""}`}
					{...props}
				/>
				{type === "password" ? (
					<FontAwesomeIcon
						icon={showPassword ? faEye : faEyeSlash}
						className="input__icon input__icon--password"
						onClick={() => setShowPassword((prev) => !prev)}
					/>
				) : (
					<FontAwesomeIcon icon={icon} className="input__icon" />
				)}
			</Container>
		</div>
	);
});

Input.displayName = "Input";

Input.propTypes = {
	className: PropTypes.string,
	fullWidth: PropTypes.bool,
	label: PropTypes.string,
	type: PropTypes.string,
	id: PropTypes.string.isRequired,
	icon: PropTypes.object,
};

export default Input;
