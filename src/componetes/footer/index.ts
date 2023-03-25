export class Footer extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerText = "Footer";
    this.style.height = "233px";
    this.style.backgroundColor = "  #FFA0EA   ";
    this.style.display = "flex";
    this.style.alignItems = "center";
    this.style.justifyContent = "center";
    this.style.fontSize = "22px";
  }
}
customElements.define("footer-element", Footer);
