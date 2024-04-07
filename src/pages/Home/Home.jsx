import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../../components/layout/Container/Container";
import Button from "../../components/ui/Button/Button";
import "./Home.css";
import { faAnglesDown, faRobot } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../contexts/context API/StateProvider";
import createNewChat from "../../utils/chat/createNewChat";

function Home() {
	const [{ user }, dispatch] = useStateValue();
	const [position, setPosition] = useState("");
	const navigate = useNavigate();

	const disableGetStarted = position === "" || !user;

	return (
		<div className="home">
			<section className="home__welcome">
				<Container className="home__welcome__container">
					<h1 className="home__title">
						Welcome to Job Interview Chatbot <FontAwesomeIcon icon={faRobot} />
					</h1>
					<p className="home__welcome__description">
						This tool is designed to help you ace your next job interview.
					</p>
					<p className="home__welcome__description">
						Simply enter your dream job position below and we&apos;ll generate a mock interview for you. Practice
						makes perfect, and with our simulator, you&apos;ll get plenty of it.
					</p>
					{!user && (
						<p className="home__welcome__description">
							It seems like you are not signed in.
							<br />
							<Link to="/signin">Click here</Link> to sign in and enjoy the benefits.
						</p>
					)}

					<form
						className="home__welcome__getStarted"
						onSubmit={(e) => createNewChat(e, position, undefined, user._id, undefined, navigate, dispatch)}>
						<input
							type="text"
							className="home__welcome__position"
							placeholder="My dream position"
							value={position}
							onChange={(e) => setPosition(e.target.value)}
						/>
						<Button
							type="submit"
							variant="primary"
							title={user ? "Get Started" : "Sign in to get started"}
							className="home__welcome__getStarted__button"
							disabled={disableGetStarted}>
							Get Started
						</Button>
					</form>

					<p className="home__welcome__description">For more details scroll down.</p>
					<FontAwesomeIcon icon={faAnglesDown} className="home__welcome__scroll" />
				</Container>
			</section>

			<section className="home__section">
				<Container>
					<h2 className="home__subtitle">How does it work?</h2>
					<p className="home__p">
						In this section you get all the information on how to get started and be successful in your next
						interview.
					</p>

					<ol className="home__steps">
						<li className="home__steps__item">
							<h3>Sign Up</h3>
							<p>
								First, <Link to="/signup">create an account</Link>. It&apos;s{" "}
								<span className="home__highlight">quick</span> and <span className="home__highlight">easy</span>
								, and it allows us to save your progress and preferences.
							</p>
						</li>
						<li className="home__steps__item">
							<h3>Create a Chat</h3>
							<p>
								Once you&apos;re signed in, enter the job position you want to apply for on the home page above.
								Our tool will generate a <span className="home__highlight">mock interview</span> for that
								position.
							</p>
						</li>
						<li className="home__steps__item">
							<h3>Practice</h3>
							<p>
								Start the chat and <span className="home__highlight">practice your responses</span>. You can
								repeat the chat as many times as you want to perfect your answers. Every chat has a unique
								button to get a typical interview question. If you have any other question related to the
								position feel free to ask the chatbot will help you.
							</p>
							<p>Remember, practice makes perfect!</p>
						</li>
						<li className="home__steps__item">
							<h3>Review</h3>
							<p>
								After each chat, you can review your responses. Use this{" "}
								<span className="home__highlight">feedback</span> to improve your answers and your interview
								skills.
							</p>
						</li>
						<li className="home__steps__item">
							<h3>Repeat</h3>
							<p>
								Practice makes perfect! Repeat the process with different job positions to prepare for a variety
								of interviews.
							</p>
						</li>
					</ol>
				</Container>
			</section>
			<footer className="home__footer">
				<Container>
					<p className="home__footer__copyright">
						&copy; {new Date().getFullYear()} István Kurucz. All rights reserved.
					</p>
				</Container>
			</footer>
		</div>
	);
}

export default Home;
