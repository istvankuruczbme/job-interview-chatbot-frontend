import { useEffect } from "react";
import { auth } from "../config/firebase";
import axios from "../config/axios";
import { useStateValue } from "../contexts/context API/StateProvider";
import checkIfNewUser from "../utils/user/checkIfNewUser";

function useAuth() {
	const [, dispatch] = useStateValue();

	useEffect(() => {
		// Function to fetch the user from the server
		async function fetchUserFromServer(userFromAuth) {
			try {
				// Fetch the user from the server
				const { data } = await axios.get(`/users/${userFromAuth.uid}`);
				console.log("User from server: ", data);

				// Set the user in the context APi
				dispatch({
					type: "SET_USER",
					user: data,
				});
			} catch (e) {
				console.log("Error fetching the user from the server:\n", e);
			}
		}

		const unsubscribe = auth.onAuthStateChanged(async (userFromAuth) => {
			console.log(userFromAuth);

			if (!userFromAuth) {
				dispatch({
					type: "SET_USER",
					user: null,
				});
				return;
			}

			// Fetch user from server
			try {
				// Give some time to the server to create the user and then fetch the user
				if (checkIfNewUser(userFromAuth)) {
					setTimeout(async () => await fetchUserFromServer(userFromAuth), 500);
				} else await fetchUserFromServer(userFromAuth);
			} catch (e) {
				console.log("Error fetching the user from the server:\n", e);
			}
		});

		return unsubscribe;
	}, [dispatch]);
}

export default useAuth;
