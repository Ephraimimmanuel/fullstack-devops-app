async function getData() {

const response = await fetch(
"http://YOUR-EC2-IP:5000/api/message"
);

const data = await response.json();

document.getElementById("result").innerText =
data.message;
}