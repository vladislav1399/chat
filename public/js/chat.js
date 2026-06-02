
const ws = new WebSocket("ws://localhost:8880");

let chatsArr = {};
let currentChat = null;

const generationChats = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/chats', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if(response.status === 200) {
        return  await response.json();
    } else {

    }
};

generationChats().then(chats => {
    chatsArr = {};

    chats.forEach(chat => {
        chatsArr[chat.id] = {
            title: chat.title,
            messages: []
        };
    });

    renderChats();
});

ws.onopen = () => {
    console.log("WS connected");
};

ws.onmessage = ({ data }) => {

    const event = JSON.parse(data);

    if (event.type === "message") {

        if (!chatsArr[event.chatId]) {
            chatsArr[event.chatId] = {
                title: "chat",
                messages: []
            };
        }

        chatsArr[event.chatId].messages.push({
            text: event.text,
            mine: event.userId === window.userId
        });

        if (Number(currentChat) === Number(event.chatId)) {
            renderMessages(); // 🔥 ВАЖНО
        }
    }
};

async function createChat() {

    const input = document.getElementById("chatName");
    const title = input.value.trim();

    if (!title) return;
    const token = localStorage.getItem('token');
    const response = await fetch("/chats", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({ title })
    });

    const chat = await response.json();

    chatsArr[chat.id] = {
        title: chat.title,
        messages: []
    };

    input.value = "";

    renderChats();
    await openChat(chat.id);
}

function renderChats() {

    const list = document.getElementById("chatList");
    list.innerHTML = "";

    Object.entries(chatsArr).forEach(([id, chat]) => {

        const div = document.createElement("div");

        div.className =
            "chat-item" +
            (id === currentChat ? " active" : "");

        // 🔥 ПОКАЗЫВАЕМ НАЗВАНИЕ
        div.textContent = chat.title;

        // 🔥 ОТКРЫВАЕМ ПО ID
        div.onclick = () => openChat(id);

        list.appendChild(div);
    });
}

async function openChat(chatId) {

    currentChat = chatId;
    document.getElementById("chatTitle").textContent = chatId;
    const token = localStorage.getItem('token');
    const response = await fetch(`/messages/${currentChat}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    console.log(data)
    ws.send(JSON.stringify({
        type: "join",
        chatId: chatId
    }));

    chatsArr[chatId].messages = data.map(m => ({
        text: m.text,
        mine: m.userId
    }));

    renderChats();
    renderMessages();
}

function renderMessages() {

    const container = document.getElementById("messages");
    container.innerHTML = "";

    if (!currentChat) return;

    const chat = chatsArr[currentChat];

    if (!chat) return;

    chat.messages.forEach(msg => {

        const div = document.createElement("div");

        // 🔥 ВАЖНО: СТАБИЛЬНОЕ УСЛОВИЕ
        div.classList.add("message");

        if (msg.mine) {
            div.classList.add("mine");
        } else {
            div.classList.add("other");
        }

        div.textContent = msg.text;

        container.appendChild(div);
    });

    container.scrollTop = container.scrollHeight;
}

async function  sendMessage() {

    if (!currentChat) {
        alert("Сначала выберите чат");
        return;
    }

    const input = document.getElementById("messageInput");
    const text = input.value.trim();

    if (!text) return;
    const token = localStorage.getItem("token");
    try {
        await fetch("/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                text,
                chatId: currentChat
            })
        });

        input.value = "";

    } catch (err) {
        console.error("Send message error:", err);
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login"
}

document
    .getElementById("messageInput")
    .addEventListener("keydown", e => {

        if (e.key === "Enter") {
            sendMessage();
        }
    });


