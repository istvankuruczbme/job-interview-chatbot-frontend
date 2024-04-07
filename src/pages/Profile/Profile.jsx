import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../../components/layout/Container/Container";
import { useStateValue } from "../../contexts/context API/StateProvider";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useChats from "../../hooks/useChats";
import Loader from "../../components/ui/Loader/Loader";
import ChatRow from "../../components/ui/ChatRow/ChatRow";
import { useEffect, useState } from "react";
import Input from "../../components/form/Input/Input";
import Button from "../../components/ui/Button/Button";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { userDefaultPhotoUrl } from "../../assets/userDefaultPhotoUrl";
import axios from "../../config/axios";
import { deleteUser, sendEmailVerification, updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import signOutUser from "../../utils/user/signOutUser";
import { useNavigate } from "react-router-dom";
import checkIfMobileDevice from "../../utils/checkIfMobileDevice";
import MobileSidebar from "../../components/layout/MobileSidebar/MobileSidebar";
// import Switch from "../../components/form/Switch/Switch";
import "./Profile.css";

function Profile() {
	const isMobileDevice = checkIfMobileDevice();

	const [{ user }, dispatch] = useStateValue();
	const [refreshChats, setRefreshChats] = useState(false);
	const { chats, loading } = useChats(refreshChats);
	const [showMenu, setShowMenu] = useState(!isMobileDevice);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [showPasswordInputs, setShowPasswordInputs] = useState(false);
	const navigate = useNavigate();

	const disablePersonalChange = name === "" || email === "" || (name === user?.name && email === user?.email);

	const samePasswords = password === passwordConfirm;
	const disablePasswordChange = password === "" || passwordConfirm === "" || !samePasswords;

	useEffect(() => {
		if (!user) return;

		setName(user.name);
		setEmail(user.email);
	}, [user]);

	async function savePersonal(e) {
		e.preventDefault();

		try {
			const { data } = await axios.put(`/users/${user._id}`, {
				name,
				email,
			});

			// Update the user's email in Firebase if it has changed
			if (email !== user.email) {
				await updateEmail(auth.currentUser, email);
			}

			// Update the name and email
			setName(data.name);
			setEmail(data.email);

			// Show feedback that the changes were saved
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					type: "success",
					show: true,
					message: "Personal info saved.",
					details: "",
				},
			});
		} catch (e) {
			console.log("Error saving personal info:\n", e);

			const error = {
				message: e.message,
				details: "Please try again later.",
			};
			switch (e.code) {
				case "auth/invalid-email":
					error.message = "Please enter a valid email address.";
					error.details = "";
					break;

				case "auth/operation-not-allowed":
					await sendEmailVerification(auth.currentUser);

					error.message = "Please verify your email address first.";
					error.details = "The email was sent to your email address. Please check your inbox.";
					break;
			}

			// Show feedback that an error occurred
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					type: "error",
					show: true,
					message: error.message,
					details: error.details,
				},
			});
		}
	}

	async function changePassword(e) {
		e.preventDefault();

		try {
			// Update the user's password
			await updatePassword(auth.currentUser, password);

			setShowPasswordInputs(false);

			// Show feedback that the password was changed
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					type: "success",
					show: true,
					message: "Password changed.",
					details: "",
				},
			});
		} catch (e) {
			console.log("Error changing password:\n", e);

			const error = {
				message: e.message,
				details: "Please try again later.",
			};

			switch (e.code) {
				case "auth/requires-recent-login":
					error.message = "Please sign in again.";
					error.details = "For security reasons, you need to sign in again before changing your password.";
					break;
			}

			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					type: "error",
					show: true,
					message: error.message,
					details: error.details,
				},
			});
		}
	}

	async function delUser(e) {
		e.preventDefault();

		const confirm = window.confirm("Are you sure you want to delete your account?");
		if (!confirm) return;

		try {
			// Delete from Firebase
			await deleteUser(auth.currentUser);

			// Delete from MongoDB
			await axios.delete(`/users/${user._id}`);

			// Show feedback that the user was deleted
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					type: "success",
					show: true,
					message: "Account deleted.",
					details: "",
				},
			});

			// Navigate to the home page
			navigate("/");
		} catch (e) {
			console.log("Error deleting user:\n", e);

			const error = {
				message: e.message,
				details: "Please try again later.",
			};

			switch (e.code) {
				case "auth/requires-recent-login":
					error.message = "Please sign in again.";
					error.details = "For security reasons, you need to sign in again before changing your password.";
					break;
			}

			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					type: "error",
					show: true,
					message: error.message,
					details: error.details,
				},
			});
		}
	}

	return (
		<div className={`profile${isMobileDevice ? " profile--mobile" : ""}`}>
			<header className="profile__header">
				<Container>
					<Link to="/chats">
						<FontAwesomeIcon icon={faAngleLeft} />
						<span className="profile__header__text">Back to my chats</span>
					</Link>
				</Container>
			</header>

			<div className="profile__main">
				<Container className="profile__main__container" zeroPadding>
					<MobileSidebar
						showSidebar={showMenu}
						setShowSidebar={setShowMenu}
						showCollapese={false}
						className="profile__sidebar">
						<img
							src={user?.photoUrl ? user.photoUrl : userDefaultPhotoUrl}
							alt={user?.name}
							className="profile__img"
						/>

						<h3 className="profile__name">{user?.name}</h3>

						<Button fullWidth className="profile__signout" onClick={() => signOutUser(navigate)}>
							Sign out
						</Button>

						<section className="profile__left__section">
							<h4 className="profile__left__subtitle">My chats</h4>

							<div className="profile__left__chats">
								{loading ? (
									<Loader text="Loading your chats..." />
								) : chats.length === 0 ? (
									<p className="profile__left__chats__noChat">No chats yet.</p>
								) : (
									<>
										{chats.map((chat) => (
											<ChatRow
												key={chat._id}
												id={chat._id}
												position={chat.position}
												setRefreshChats={setRefreshChats}
											/>
										))}
									</>
								)}
							</div>
						</section>
					</MobileSidebar>

					<div className="profile__right">
						<h3 className="profile__subtitle">Profile</h3>

						<form className="profile__form" onSubmit={savePersonal}>
							<h4 className="profile__form__title">Personal</h4>

							<div className="profile__form__inputs">
								<Input
									type="text"
									label="Name"
									id="profileName"
									placeholder="Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									icon={faUser}
									fullWidth
								/>
								<Input
									type="email"
									label="Email"
									id="profileEmail"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									icon={faEnvelope}
									fullWidth
								/>
							</div>

							<div className="profile__form__buttons">
								<Button type="submit" className="profile__form__save" disabled={disablePersonalChange}>
									Save
								</Button>
							</div>
						</form>

						<form className="profile__form" onSubmit={changePassword}>
							<h4 className="profile__form__title">Change password</h4>

							{!showPasswordInputs && (
								<Button type="button" onClick={() => setShowPasswordInputs(true)}>
									Change password
								</Button>
							)}

							{showPasswordInputs && (
								<>
									<div className="profile__form__inputs">
										<Input
											type="password"
											label="Password"
											id="profilePassword"
											placeholder="New password"
											required
											fullWidth
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
										<Input
											type="password"
											label="Password Confirm"
											id="profilePasswordConfirm"
											placeholder="New password again"
											required
											fullWidth
											value={passwordConfirm}
											onChange={(e) => setPasswordConfirm(e.target.value)}
										/>
										{samePasswords ? (
											<br />
										) : (
											<p className="profile__form__text">The passwords don&apos;t match.</p>
										)}
									</div>

									<div className="profile__form__buttons">
										<Button type="button" variant="accentLight" onClick={() => setShowPasswordInputs(false)}>
											Cancel
										</Button>
										<Button type="submit" disabled={disablePasswordChange}>
											Save
										</Button>
									</div>
								</>
							)}
						</form>

						{/* <form className="profile__form" onSubmit={() => console.log("Settings form submitted")}>
							<h4 className="profile__form__title">Settings</h4>

							<p className="profile__form__text">
								In this section you can change your preferences in connection with the app.
							</p>

							<div className="profile__form__inputs">
								<Switch id="profileTheme" labelLeft="Light" labelRight="Dark" className="profile__theme" />
							</div>

							<div className="profile__form__buttons">
								<Button type="submit">Save</Button>
							</div>
						</form> */}

						<form className="profile__form" onSubmit={delUser}>
							<h4 className="profile__form__title">Delete account</h4>

							<p className="profile__form__text">
								By deleting your account, all your data will be permanently deleted. This action cannot be
								undone.
							</p>

							<div className="profile__form__buttons">
								<Button type="submit" variant="red">
									Delete account
								</Button>
							</div>
						</form>
					</div>
				</Container>
			</div>
		</div>
	);
}

export default Profile;
