




    const ws = new WebSocket(`ws://localhost:8880`);

    ws.onopen = () => {
    console.log("✅ WS connected");
};

    const messages = document.getElementById("messages");
    const input = document.getElementById("input");

    ws.onmessage = ({ data }) => {
    console.log(data)
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = data;

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
};

    function send() {
    const text = input.value.trim();

    if (!text) return;

    ws.send(text);
    input.value = "";
}

    input.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
});
