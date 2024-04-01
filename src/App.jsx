import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import useAuth from "./hooks/useAuth";
import Nav from "./components/layout/Nav/Nav";
import Chats from "./pages/Chats/Chats";

function App() {
	useAuth();
	const location = useLocation();

	const showNav = location.pathname !== "/signin" && location.pathname !== "/signup";

	return (
		<>
			{showNav && <Nav />}
			<Routes>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/chats" element={<Chats />}></Route>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<h2>Page not found</h2>} />
			</Routes>
		</>
	);
}

export default App;
