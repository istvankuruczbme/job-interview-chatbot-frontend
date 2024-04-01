import axios from "../../config/axios";

export default async function addUserToDB(user) {
	try {
		// Create the user in the server
		await axios.post("/users", {
			firebase: {
				id: user.uid,
			},
			name: user.displayName ?? user.email,
			photoUrl: user.photoURL,
		});
	} catch (e) {
		console.log("Error adding user to the database:\n", e);
	}
}
