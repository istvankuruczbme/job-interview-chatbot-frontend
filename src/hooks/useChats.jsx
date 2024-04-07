import { useEffect, useState } from "react";
import { useStateValue } from "../contexts/context API/StateProvider";
import axios from "../config/axios";

function useChats(refresh = false) {
	const [{ user }] = useStateValue();
	const [chats, setChats] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user) {
			setLoading(false);
			return;
		}

		async function fetchChats() {
			setLoading(true);

			try {
				const { data } = await axios.get(`/chats?userId=${user._id}`);

				setChats(data);
				setLoading(false);
			} catch (e) {
				console.log("Error fetching chats:\n", e);
				setLoading(false);
			}
		}

		fetchChats();
	}, [user, refresh]);

	return { chats, loading };
}

export default useChats;
