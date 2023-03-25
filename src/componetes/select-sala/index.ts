import { state } from "../../state";

export class SelectSalaChat extends HTMLElement {
  connectedCallback() {
    this.render();
    const select = this.querySelector("#chat-room");
    state.subscribe(() => {
      // creo un nuevo objeto con el estado actual y le agrego el nuevo valor
      select.addEventListener("change", (e: any) => {
        e.preventDefault();
        state.setState({
          ...state.getState(),
          name: e.target.value,
        });
      });
    });
  }

  render() {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="body-sala">
        <label for="chat-room">Selecciona una sala de chat:</label>
        <select id="chat-room" name="chat-room">
        
       
        </select>
        </div>
        `;
    const style = document.createElement("style");
    style.innerHTML = `
        .body-sala {  display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            
            
        }
        
        
        `;
    div.append(style);
    this.append(div);
    //funcion para obtener los datos del state

    return div;
  }
}

customElements.define("select-sala", SelectSalaChat);
