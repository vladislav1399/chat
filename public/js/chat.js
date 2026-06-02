
const ws = new WebSocket("ws://localhost:8880");

let chatsArr = []
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
    chatsArr = chats
    renderChats();
});


ws.onopen = () => {
    console.log("WS connected");
};

ws.onmessage = ({ data }) => {
    const event = JSON.parse(data);
    console.log(event)
    if (event.type === "chat_created") {
        const chat = event.chat;
        chatsArr[chat.title] = [];
        renderChats();
    }
};


async function createChat() {

    const input = document.getElementById("chatName");
    const title = input.value.trim();

    if (!title) return;

    if (chatsArr[title]) {
        alert("Такой чат уже существует");
        return;
    }
        const token = localStorage.getItem("token");

        const response = await fetch("/chats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title
            })
        });

        const chat = await response.json();

     chatsArr[title] = [];
    input.value = "";
    renderChats();
    openChat(title);
}


function renderChats() {

    const list = document.getElementById("chatList");
    list.innerHTML = "";
    chatsArr.forEach(chat => {
        const div = document.createElement("div");

        div.className =
            "chat-item" +
            (chat.title === currentChat ? " active" : "");

        div.textContent = chat.title;

        div.onclick = () => openChat(chat.title);

        list.appendChild(div);
    });
}

function openChat(title) {

    currentChat = title;

    document.getElementById("chatTitle")
        .textContent = title;

    renderChats();
    renderMessages();
}

function renderMessages() {

    const container =
        document.getElementById("messages");

    container.innerHTML = "";

    if (!currentChat) return;

    chatsArr[currentChat].forEach(msg => {

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

    chatsArr[currentChat].push({
        text,
        mine:true
    });

    input.value = "";

    renderMessages();

    setTimeout(() => {

        chatsArr[currentChat].push({
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