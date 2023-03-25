export class Welcome extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const div = document?.createElement("div");
    const style = document.createElement("style");
    // console.log(div);
    div.className = "container-form";
    div.innerHTML = `
    <div class="body">
    <header-element></header-element>
    <title-chat></title-chat>

  <form-welcome></form-welcome>
    
    <footer-element></footer-element>
    </div>

      `;
    style.innerHTML = `
    .body{
      
    }
    .container-form{
    }
    

.
`;
    div.append(style);
    this.shadowRoot.appendChild(div);
  }
}

customElements.define("welcome-pages", Welcome);
