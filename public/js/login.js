
const form = document.getElementById("loginForm");


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        console.log("Ответ сервера:", data);
        localStorage.setItem("token", data.token);
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        window.userId = payload.id;
        window.username = payload.username
        window.location.href = "/";

    } catch (err) {
        console.error("Ошибка:", err);
    }
});