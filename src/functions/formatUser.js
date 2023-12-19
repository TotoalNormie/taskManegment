export default function formatUser(string) {
	if (string) return string.slice(0, 2).toUpperCase();
	return string;
}
