import axios from "../../config/axios";

export default async function addMessageToDB(message) {
	try {
		const { data } = await axios.post("/messages", message);

		return data;
	} catch (e) {
		console.log("Error creating the new message in the DB: \n", e);
		return e;
	}
}
