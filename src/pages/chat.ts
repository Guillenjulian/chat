//import { state } from "../state";

import "../componetes/header";
import "../componetes/footer";
import "../componetes/form";
import "../componetes/title-chat";

export class ChatElement extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    this.render();
  }
  render() {
    const div = document?.createElement("div");
    const style = document.createElement("style");
    div.innerHTML = `
    <div class="body">
    <header-element></header-element>
    <title-chat></title-chat>
      <form-element></form-element>
    <footer-element></footer-element>
    </div>
    `;
    style.innerHTML = `
      .body {  
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
      }

      `;
    div.append(style);
    this.shadowRoot.appendChild(div);
    //console.log("este es el div del chat", div);
  }
}
customElements.define("chat-page", ChatElement);
