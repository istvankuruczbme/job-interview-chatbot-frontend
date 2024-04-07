import axios from "axios";

const instance = axios.create({
	// baseURL: import.meta.env.VITE_SERVER_URL,
	baseURL: "https://determined-fawn-hosiery.cyclic.app",
});

export default instance;
