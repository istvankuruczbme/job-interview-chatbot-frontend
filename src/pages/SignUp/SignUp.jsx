import { useState } from "react";
import "./SignUp.css";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Input from "../../components/form/Input/Input";
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import CancelSaveButtons from "../../components/layout/CancelSaveButtons/CancelSaveButtons";
import AuthTitle from "../../components/ui/AuthTitle/AuthTitle";
import BackButton from "../../components/ui/Button/BackButton";
import Button from "../../components/ui/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import AuthText from "../../components/ui/AuthText/AuthText";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import addUserToDB from "../../utils/user/addUserToDB";

function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const navigate = useNavigate();

	const disableSignUp = email === "" || password === "" || passwordConfirm === "";

	async function signUpUser(e) {
		e.preventDefault();

		// Check if the passwords match
		if (password !== passwordConfirm) {
			console.log("The passwords don't match");
			return;
		}

		try {
			// Sign up the user in Firebase
			const { user } = await createUserWithEmailAndPassword(auth, email, password);

			// Add the user to the database
			await addUserToDB(user);

			navigate("/");
		} catch (e) {
			console.log("Error signing up the user: \n", e);
		}
	}

	return (
		<AuthLayout className="signup">
			<BackButton link="/" />
			<AuthTitle>Sign Up</AuthTitle>

			<form className="signup__form" onSubmit={signUpUser}>
				<Input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					id="signinEmail"
					label="Email"
					placeholder="Email"
					icon={faEnvelope}
					fullWidth
				/>
				<br />
				<Input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					id="signinPassword"
					label="Password"
					placeholder="Password"
					fullWidth
				/>
				<br />
				<Input
					alue={passwordConfirm}
					onChange={(e) => setPasswordConfirm(e.target.value)}
					type="password"
					id="signinPasswordConfirm"
					label="PasswordConfirm"
					placeholder="Password Confirm"
					fullWidth
				/>
				{password === passwordConfirm && <br />}
				{password !== passwordConfirm && <p className="signup__form__text">The passwords don&apos;t march.</p>}
				<CancelSaveButtons>
					<Button type="button" variant="accentLight" fullWidth>
						Cancel
					</Button>
					<Button type="submit" fullWidth disabled={disableSignUp}>
						Sign Up
					</Button>
				</CancelSaveButtons>
			</form>

			<AuthText className="signup__text">
				Already have an account?{" "}
				<Link to="/signin" className="signin__link">
					Sign In
				</Link>
			</AuthText>
		</AuthLayout>
	);
}

export default SignUp;
