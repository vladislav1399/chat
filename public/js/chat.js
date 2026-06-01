const chats = {};
let currentChat = null;

function createChat() {

    const input = document.getElementById("chatName");
    const name = input.value.trim();

    if (!name) return;

    if (chats[name]) {
        alert("Такой чат уже существует");
        return;
    }

    chats[name] = [];

    input.value = "";

    renderChats();
    openChat(name);
}

function renderChats() {

    const list = document.getElementById("chatList");
    list.innerHTML = "";

    Object.keys(chats).forEach(name => {

        const div = document.createElement("div");

        div.className =
            "chat-item" +
            (name === currentChat ? " active" : "");

        div.textContent = name;

        div.onclick = () => openChat(name);

        list.appendChild(div);
    });
}

function openChat(name) {

    currentChat = name;

    document.getElementById("chatTitle")
        .textContent = name;

    renderChats();
    renderMessages();
}

function renderMessages() {

    const container =
        document.getElementById("messages");

    container.innerHTML = "";

    if (!currentChat) return;

    chats[currentChat].forEach(msg => {

        const div = document.createElement("div");

        div.className =
            `message ${msg.mine ? 'mine' : 'other'}`;

        div.textContent = msg.text;

        container.appendChild(div);
    });

    container.scrollTop =
        container.scrollHeight;
}

function sendMessage() {

    if (!currentChat) {
        alert("Сначала выберите чат");
        return;
    }

    const input =
        document.getElementById("messageInput");

    const text = input.value.trim();

    if (!text) return;

    chats[currentChat].push({
        text,
        mine:true
    });

    input.value = "";

    renderMessages();

    setTimeout(() => {

        chats[currentChat].push({
            text:"Ответ на: " + text,
            mine:false
        });

        renderMessages();

    }, 500);
}

document
    .getElementById("messageInput")
    .addEventListener("keydown", e => {

        if (e.key === "Enter") {
            sendMessage();
        }
    });

createChat.bind(null);