import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import axios from "../config/axios";
import { useStateValue } from "../contexts/context API/StateProvider";
import checkIfNewUser from "../utils/user/checkIfNewUser";

function useAuth() {
	const [, dispatch] = useStateValue();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Function to fetch the user from the server
		async function fetchUserFromServer(userFromAuth) {
			try {
				// Fetch the user from the server
				const { data } = await axios.get(`/users/${userFromAuth.uid}`);

				// Set the user in the context APi
				dispatch({
					type: "SET_USER",
					user: data,
				});

				setLoading(false);
			} catch (e) {
				console.log("Error fetching the user from the server:\n", e);
				setLoading(false);
			}
		}

		const unsubscribe = auth.onAuthStateChanged(async (userFromAuth) => {
			if (!userFromAuth) {
				dispatch({
					type: "SET_USER",
					user: null,
				});

				setLoading(false);
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

	return { loading };
}

export default useAuth;
