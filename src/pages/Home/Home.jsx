import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../../components/layout/Container/Container";
import Button from "../../components/ui/Button/Button";
import "./Home.css";
import { faAnglesDown, faRobot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useStateValue } from "../../contexts/context API/StateProvider";

function Home() {
	const [{ user }] = useStateValue();

	return (
		<div className="home">
			<section className="home__welcome">
				<Container className="home__welcome__container">
					<h1 className="home__title">
						Welcome to Job Interview Chatbot <FontAwesomeIcon icon={faRobot} />
					</h1>
					<p className="home__welcome__description">
						Be successful in your next job interview! To achieve this just enter a position you like in the box
						below and you are ready to get started.
					</p>
					{!user && (
						<p className="home__welcome__description">
							It seems like you are not signed in.
							<br />
							<Link to="/signin">Click here</Link> to sign in and enjoy the benefits.
						</p>
					)}

					<div className="home__welcome__getStarted">
						<input type="text" className="home__welcome__position" placeholder="My dream position" />
						<Button variant="primary" className="home__welcome__getStarted__button">
							Get Started
						</Button>
					</div>

					<p className="home__welcome__description">For more details scroll down.</p>
					<FontAwesomeIcon icon={faAnglesDown} className="home__welcome__scroll" />
				</Container>
			</section>

			<section className="home__section">
				<Container>How does it work?</Container>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</section>
		</div>
	);
}

export default Home;
