// mobile menu

const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("navLinks");

toggle.onclick = () => {
nav.classList.toggle("active");
};

// chatbot toggle

const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");

chatBtn.onclick = () => {

if(chatBox.style.display === "flex"){
chatBox.style.display = "none";
}else{
chatBox.style.display = "flex";
}

};

// send message

function sendMessage(){

const input = document.getElementById("userInput");
const messages = document.getElementById("chatMessages");

let userText = input.value;

messages.innerHTML += "<p><b>You:</b> " + userText + "</p>";

input.value="";

/* AI API PLACEHOLDER */

let botReply = "AI assistant will reply here after API integration.";

messages.innerHTML += "<p><b>AI:</b> " + botReply + "</p>";

}