import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axios";

function useMessages(authenticated, limit = 10) {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const { chatId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (!chatId || !authenticated) {
			setLoading(false);
			return;
		}

		async function fetchMessages() {
			setLoading(true);

			try {
				const { data } = await axios.get(`/messages?chatId=${chatId}&limit=${limit}`);

				setMessages(data.map((message) => ({ ...message, isNew: false })));
				setLoading(false);
			} catch (e) {
				console.log("Error fetching messages:\n", e);
				const error = {
					code: e,
					message: "An unknown error occurred!",
				};

				setLoading(false);
				navigate("/error", { replace: true, state: { error } });
			}
		}

		fetchMessages();
	}, [chatId, authenticated, limit, navigate]);

	return { messages, setMessages, loadingMessages: loading };
}

export default useMessages;
