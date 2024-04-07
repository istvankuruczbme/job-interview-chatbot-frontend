import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import useAuth from "./hooks/useAuth";
import Nav from "./components/layout/Nav/Nav";
import Chats from "./pages/Chats/Chats";
import Chat from "./pages/Chats/Chat";
import ChatsIntro from "./pages/Chats/ChatsIntro";
import Feedback from "./components/ui/Feedback/Feedback";
import { useStateValue } from "./contexts/context API/StateProvider";
import Error from "./pages/Error/Error";
import Profile from "./pages/Profile/Profile";

function App() {
	const { loading } = useAuth();
	const [{ user }] = useStateValue();
	const location = useLocation();

	const showNav =
		location.pathname !== "/signin" && location.pathname !== "/signup" && location.pathname !== "/profile";

	return (
		<>
			<Feedback />

			{showNav && <Nav />}

			<Routes>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/chats" element={loading || user ? <Chats /> : <Navigate to="/signin" replace />}>
					<Route index element={<ChatsIntro />} />
					<Route path=":chatId" element={<Chat />} />
				</Route>
				<Route path="/profile" element={<Profile />} />
				<Route path="/" element={<Home />} />
				<Route path="/error" element={<Error />} />
				<Route path="*" element={<h2>Page not found</h2>} />
			</Routes>
		</>
	);
}

export default App;
