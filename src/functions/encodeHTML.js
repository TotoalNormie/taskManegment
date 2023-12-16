export default function EncodeHTML(str) {
	let __fakeElement = document.createElement('p');
	__fakeElement.textContent = str;
	return __fakeElement.innerHTML.replace('"', '&quot');
}
