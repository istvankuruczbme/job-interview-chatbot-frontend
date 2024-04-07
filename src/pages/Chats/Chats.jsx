import ChatsSidebar from "./ChatsSidebar";
import "./Chats.css";
import checkIfMobileDevice from "../../utils/checkIfMobileDevice";
import { Outlet } from "react-router-dom";
import useChats from "../../hooks/useChats";
import { useState } from "react";

function Chats() {
	const isMobileDevice = checkIfMobileDevice();

	const [refreshChats, setRefreshChats] = useState(false);
	const { chats, loading } = useChats(refreshChats);

	return (
		<div className={`chats${isMobileDevice ? " chats--mobile" : ""}`}>
			<ChatsSidebar chats={chats} loading={loading} setRefreshChats={setRefreshChats} />
			<Outlet context={{ chats, loading, setRefreshChats }} />
		</div>
	);
}

export default Chats;
