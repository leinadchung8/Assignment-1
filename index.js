import { Order } from "./Order.js";

class Chat extends HTMLElement {
    constructor() {
        super();
        this.order = new Order("123-456-7891");
    }

    sendMessage(evt) {
        evt.preventDefault();
        let msg = this.input.value;
        this.input.value = "";
        this.writeline(`You: ${msg}`);
        const botResponses = this.order.handleInput(msg);
        for (let response of botResponses) {
            this.writeline(`Bot: ${response}`);
        }
    }

    writeline(text) {
        this.messages.insertAdjacentHTML("beforeend", `<li class="message-item">${text}</li>`);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
            .chat-container {
                width: 400px;
                height: 400px;
                border: 1px solid black;
                display: flex;
                flex-direction: column;
                padding: 10px;
                overflow-y: auto;
            }
            .message-input {
                display: flex;
                margin-top: 10px;
            }
            .message-input input {
                flex-grow: 1;
                padding: 5px;
            }
            .message-input button {
                padding: 5px;
            }
        </style>
        <div class="chat-container">
            <ul class="messages"></ul>
            <form class="message-input">
                <input type="text" placeholder="Type your message..." />
                <button type="submit">Send</button>
            </form>
        </div>
        `;
        this.input = this.querySelector("input");
        this.messages = this.querySelector(".messages");
        this.querySelector("form").addEventListener("submit", this.sendMessage.bind(this));

        // Start the bot
        const welcomeMessages = this.order.handleInput("");
        for (let message of welcomeMessages) {
            this.writeline(`Bot: ${message}`);
        }
    }
}

customElements.define("x-chat", Chat);
