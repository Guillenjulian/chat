import { state } from "../../state";

export class TitleChat extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    const div = document.createElement("div");
    div.innerHTML = `
      <h1 class="title"> Bienvenido a el Chat </h1>
      `;
    const style = document.createElement("style");
    style.innerHTML = `
      .title{
        font-size: 2rem;
        font-weight: 600;
        color: #000;
        text-align: center;
        margin-top: 1rem;
        margin-bottom: 1rem;
    
        height: 122px;
        text-align: center;
        

      }
      `;
    div.append(style);
    this.appendChild(div);
    return div;
  }
}
customElements.define("title-chat", TitleChat);
