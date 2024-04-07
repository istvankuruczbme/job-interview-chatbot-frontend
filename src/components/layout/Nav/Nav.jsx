import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../Container/Container";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faArrowRightToBracket, faRobot } from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "../../../contexts/context API/StateProvider";
import { useLayoutEffect, useRef } from "react";
import { faComment, faUser } from "@fortawesome/free-regular-svg-icons";
import checkIfMobileDevice from "../../../utils/checkIfMobileDevice";
import { userDefaultPhotoUrl } from "../../../assets/userDefaultPhotoUrl";
import Submenu from "../../ui/Submenu/Submenu";
import signOutUser from "../../../utils/user/signOutUser";

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

		handleScroll();

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [location.pathname]);

	return (
		<nav ref={navRef} className="nav nav--top">
			<Container className="nav__container">
				<Link to="/">
					<FontAwesomeIcon icon={faRobot} className="nav__logo" />
				</Link>

				<div className="nav__user">
					{isMobilDevice ? (
						<img
							src={user && user?.photoUrl ? user.photoUrl : userDefaultPhotoUrl}
							alt={user?.name}
							className="nav__user__img"
						/>
					) : (
						<Link to="/profile" className="nav__user">
							<img
								src={user && user?.photoUrl ? user.photoUrl : userDefaultPhotoUrl}
								alt={user?.name}
								className="nav__user__img"
							/>
						</Link>
					)}

					<Submenu className="nav__userMenu">
						{user && (
							<li className="nav__userMenu__item">
								<Link to="/chats">
									<FontAwesomeIcon icon={faComment} />
									My chats
								</Link>
							</li>
						)}
						{user && isMobilDevice && (
							<li className="nav__userMenu__item">
								<Link to="/profile">
									<FontAwesomeIcon icon={faUser} />
									Profile
								</Link>
							</li>
						)}

						{user ? (
							<li className={`nav__userMenu__item nav__userMenu__item--signout nav__userMenu__item--divider`}>
								<Link onClick={() => signOutUser(navigate)}>
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
					</Submenu>
				</div>
			</Container>
		</nav>
	);
}

export default Nav;
