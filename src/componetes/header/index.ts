export class Header extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerText = "Header";
    this.style.height = "60px";
    this.style.backgroundColor = "  #FF8282   ";
    this.style.display = "flex";
    this.style.alignItems = "center";
    this.style.justifyContent = "center";
    this.style.fontSize = "22px";
  }
}
customElements.define("header-element", Header);
