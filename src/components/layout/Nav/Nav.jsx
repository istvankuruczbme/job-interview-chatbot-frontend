import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../Container/Container";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faArrowRightToBracket, faRobot } from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "../../../contexts/context API/StateProvider";
import { useLayoutEffect, useRef } from "react";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";
import checkIfMobileDevice from "../../../utils/checkIfMobileDevice";

const defaultUserPhotoUrl = "https://www.gravatar.com/avatar/000?d=mp";

function Nav() {
	const [{ user }] = useStateValue();
	const navRef = useRef();
	const location = useLocation();
	const navigate = useNavigate();

	const isMobilDevice = checkIfMobileDevice();

	// Handling the style changes of the nav
	useLayoutEffect(() => {
		if (location.pathname !== "/") {
			navRef.current.classList.remove("nav--top");
			navRef.current.classList.add("nav--sticky");
		}

		function handleScroll() {
			if (location.pathname === "/") {
				if (window.scrollY > 50) navRef.current.classList.remove("nav--top");
				else navRef.current.classList.add("nav--top");
			}
		}

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, [location.pathname]);

	async function signOutUser() {
		try {
			await signOut(auth);

			navigate("/");
		} catch (e) {
			console.log("Error signing out user:\n", e);
		}
	}

	return (
		<nav ref={navRef} className="nav nav--top">
			<Container className="nav__container">
				<Link to="/">
					<FontAwesomeIcon icon={faRobot} className="nav__logo" />
				</Link>

				<div className="nav__user">
					{isMobilDevice ? (
						<img
							src={user && user?.photoUrl ? user.photoUrl : defaultUserPhotoUrl}
							alt={user?.name}
							className="nav__user__img"
						/>
					) : (
						<Link to="/profile" className="nav__user">
							<img
								src={user && user?.photoUrl ? user.photoUrl : defaultUserPhotoUrl}
								alt={user?.name}
								className="nav__user__img"
							/>
						</Link>
					)}

					<ul className="nav__userMenu">
						{user && (
							<li className="nav__userMenu__item">
								<Link to="/chats">
									<FontAwesomeIcon icon={faComment} />
									My chats
								</Link>
							</li>
						)}

						{user ? (
							<li className={`nav__userMenu__item nav__userMenu__item--signout nav__userMenu__item--divider`}>
								<Link onClick={signOutUser}>
									<FontAwesomeIcon icon={faArrowRightFromBracket} />
									Sign Out
								</Link>
							</li>
						) : (
							<li className="nav__userMenu__item nav__userMenu__item--signin">
								<Link to="/signin">
									<FontAwesomeIcon icon={faArrowRightToBracket} />
									Sign In
								</Link>
							</li>
						)}
					</ul>
				</div>
			</Container>
		</nav>
	);
}

export default Nav;
