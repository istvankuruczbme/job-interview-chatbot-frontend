import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axios";
import { useStateValue } from "../contexts/context API/StateProvider";

function useChat() {
	const [{ user }] = useStateValue();
	const [chat, setChat] = useState({});
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const { chatId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (!chatId || !user) {
			setLoading(false);
			return;
		}

		async function fetchChat() {
			setLoading(true);

			try {
				const { data } = await axios.get(`/chats/${chatId}`);

				if (!data) throw new Error("chat/not-found");

				if (user._id !== data.userId) {
					throw new Error("chat/not-authorized");
				}
				setAuthenticated(true);

				setChat(data);
				setLoading(false);
			} catch (e) {
				const error = {
					code: e,
					message: "You are not authorized to view this chat!",
				};
				switch (e) {
					case "chat/not-authorized":
						error.message = "You are not authorized to view this chat!";
						break;

					case "chat/not-found":
						error.message = "Chat not found!";
						break;

					default:
						error.message = "An unknown error occurred!";
				}

				navigate("/error", { replace: true, state: { error } });
				setLoading(false);
			}
		}

		fetchChat();
	}, [chatId, user, navigate]);

	return { chat, authenticated, loadingChat: loading };
}

export default useChat;
