export default function checkIfNewUser(user) {
	return parseInt(user.metadata.lastLoginAt) - parseInt(user.metadata.createdAt) < 100;
}
