let convHistory = [];

async function sendMessage() {
  const msgInput = document.getElementById("msg");
  const msg = msgInput.value.trim();
  if (!msg) return;

  msgInput.value = "";
  convHistory.push({ sender: "user", text: msg });
  renderMessage("user", msg);

  try {
    const res = await fetch("https://cmdev-agent-api-89c79a0dd53f.herokuapp.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    const reply = data.reply;

    convHistory.push({ sender: "bot", text: reply });
    renderMessage("bot", reply);
  } catch (error) {
    console.error("API call failed:", error);
    renderError("Looks like either there's an issue, or a-Gent is burnt out for the day...");
  }

  console.log(convHistory);
}

function renderMessage(sender, text) {
  const responseEl = document.getElementById("response");
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "user" ? "user-msg" : "bot-msg";

  const paragraph = document.createElement("p");
  paragraph.innerText = text;

  messageDiv.appendChild(paragraph);
  responseEl.appendChild(messageDiv);
  responseEl.scrollTop = responseEl.scrollHeight;
}

function renderError(text) {
  const responseEl = document.getElementById("response");
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-msg";

  const paragraph = document.createElement("p");
  paragraph.innerText = text;

  errorDiv.appendChild(paragraph);
  responseEl.appendChild(errorDiv);
  responseEl.scrollTop = responseEl.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".a-gent-send").addEventListener("click", sendMessage);
});

const msgInput = document.getElementById("msg");
msgInput.addEventListener("input", () => {
  msgInput.style.height = "auto";
  msgInput.style.height = msgInput.scrollHeight + "px";
});
msgInput.addEventListener("focus", () => {
  setTimeout(() => {
    msgInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 300);
});
