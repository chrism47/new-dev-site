let convHistory = [];

async function sendMessage() {
  const msgInput = document.getElementById("msg");
  const msg = msgInput.value.trim();
  if (!msg) return;

  msgInput.value = "";
  convHistory.push({ sender: "user", text: msg });
  renderMessage("user", msg);

  const res = await fetch("https://cmdev-agent-api-89c79a0dd53f.herokuapp.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg }),
  });

  const data = await res.json();
  const reply = data.reply;

  convHistory.push({ sender: "bot", text: reply });
  renderMessage("bot", reply);

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

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".a-gent-send").addEventListener("click", sendMessage);

//   // 📝 Optional placeholder messages — feel free to comment these out
//   const defaultConv = [
//     { sender: "user", text: "Hello" },
//     { sender: "bot", text: "Hi there! How can I help you today?" },
//     { sender: "user", text: "What can you do?" },
//     { sender: "bot", text: "I can assist with tasks like summarizing, writing, coding, and more." },
//   ];
//   defaultConv.forEach(msg => renderMessage(msg.sender, msg.text));
});

const msgInput = document.getElementById("msg");

msgInput.addEventListener("input", () => {
  msgInput.style.height = "auto"; // reset height
  msgInput.style.height = msgInput.scrollHeight + "px"; // set to scroll height
});
