import { useRef, useState } from "react";
import "./SignIn.css";
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import BackButton from "../../components/ui/Button/BackButton";
import AuthTitle from "../../components/ui/AuthTitle/AuthTitle";
import Input from "../../components/form/Input/Input";
import CancelSaveButtons from "../../components/layout/CancelSaveButtons/CancelSaveButtons";
import Button from "../../components/ui/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Delimiter from "../../components/ui/Delimiter/Delimiter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import AuthText from "../../components/ui/AuthText/AuthText";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import checkIfNewUser from "../../utils/user/checkIfNewUser";
import addUserToDB from "../../utils/user/addUserToDB";

function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const signInButton = useRef();
	const signInWithGoogleButton = useRef();
	const navigate = useNavigate();

	const disableSignIn = email === "" || password === "";

	async function signInUser(e) {
		e.preventDefault();

		// Disable the button to prevent multiple sign in requests
		signInButton.current.setAttribute("disabled", "true");

		try {
			await signInWithEmailAndPassword(auth, email, password);

			navigate("/");
		} catch (e) {
			console.log("Error signing in the user: \n", e);
		}

		// Enable the button
		signInButton.current.setAttribute("disabled", "false");
	}

	async function signInUserWithGoogle() {
		// Disable the button to prevent multiple sign in requests
		signInWithGoogleButton.current.setAttribute("disabled", "true");

		try {
			const { user } = await signInWithPopup(auth, googleProvider);

			// Add the user to the database if it's a new user
			if (checkIfNewUser(user)) {
				await addUserToDB(user);
			}

			navigate("/");
		} catch (e) {
			console.log("Error signing in the user with Google: \n", e);
		}

		// Enable the button
		signInWithGoogleButton.current.setAttribute("disabled", "false");
	}

	return (
		<AuthLayout className="signin">
			<BackButton link=".." />
			<AuthTitle>Sign In</AuthTitle>

			<form className="signin__form" onSubmit={signInUser}>
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
				<CancelSaveButtons>
					<Button type="button" variant="accentLight" fullWidth>
						Cancel
					</Button>
					<Button ref={signInButton} type="submit" fullWidth disabled={disableSignIn}>
						Sign In
					</Button>
				</CancelSaveButtons>
			</form>

			<AuthText>
				Don&apos;t have an account?{" "}
				<Link to="/signup" className="signin__link">
					Sign Up
				</Link>
			</AuthText>

			<Delimiter text="or continue with" />

			<div className="signin__options">
				<Button
					ref={signInWithGoogleButton}
					type="button"
					variant="primary"
					title="Google"
					className="signin__options__button"
					onClick={signInUserWithGoogle}>
					<FontAwesomeIcon icon={faGoogle} />
				</Button>
			</div>
		</AuthLayout>
	);
}

export default SignIn;
