import { Router } from "@vaadin/router";
import { state } from "../../state";

export class FormWelcome extends HTMLElement {
  constructor() {
    super();

    this.render();
    this.connctedCallback();
  }
  connctedCallback() {
    const form = this.querySelector(".form");
    // console.log(form, "este es el form");

    form.addEventListener("submit", (e) => {
      const target = e.target as any;
      // console.log(target.nombre.value, "nombre");
      state.setName(target.nombre.value);
      Router.go("/chat");
      this.render();
    });
    const selectRoom: any = form?.querySelector(".selectroom");
    const existingRoom: any = form?.querySelector(".select-sala");
    // console.log(existingRoom, "es para seleccionar");

    // console.log(selectRoom);
    selectRoom.addEventListener("change", function () {
      if (selectRoom.value == "existingroom") {
        existingRoom.style.display = "inline";
        // console.log("si crea una sala nueva", existingRoom);
      } else {
        existingRoom.style.display = "none";
      }
    });
  }
  render() {
    const div = document?.createElement("div");
    const style = document.createElement("style");

    div.innerHTML = `
    <div class ="container">
    <form class ="form">


    <div> <label class ="form-label" >  Tu nombre</label>    </div>
    <input  class ="form-input" type ="text" name= "name" placeholder= "Tu Nombre">
    
    
    <div><label class ="form-label" >  Tu Email</label></div>
    <input  class ="form-input" type ="email" name= "email" placeholder= "Tu Email">
    <div><label class ="form-label">  Salas </label>   </div>
    <select class ="selectroom form-input" name ="selectroom" id :"selectroom">
    <option class ="newroom" value = "newroom">Nueva Sala</option>
    <option class ="existingroom" value = "existingroom">Sala existente</option>
    </select>
<div class ="select-sala">

<div> <label class ="form-label" >  Nombre de la sala</label>    </div>
<input  class ="form-input " type ="text" name= "nombre" placeholder= " Nombre de la sala">
</div>
    
    <button class ="form-button" >Comenzar</button>
    </div>
    </form>
    </div>
    `;

    style.innerHTML = `
    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    }
    .form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        height: 75vh;
        width: 50vh;
        gap: 1vh;
      }
      
    .form-label{
        font-size: 2rem;
        font-weight: 600;
        color: #000;
        text-align: center;
        margin-top: 1rem;
        margin-bottom: 1rem;
        height: 122px;
        text-align: center;
    }
    .form-input  {
        border-color: #ccc;
        font-size: 16px;
        height: 45px;
        width: 100%;
        padding: 8px 12px;
        border-radius: 4px;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        transition: border-color 0.3s ease-in-out;
        font-size:24px;

    }
    .form-input:focus{
        border-color: #0077cc;
    }
    .selectroom{
      font-size:24px;
      
    }
    .select-sala{
      display: none;
    }
    .form-button {      
            background: #9CBBE9;
            border-radius: 4px;
            height:55px ;
            width: 100%;
            margin-top:30px;
            font-size:24px;
            border:none
    }
    .form-button:focus {
          transition: background-color 0.3s ease-in-out;}
          background-color: #005fad;
    }
    .form-button:hover {
        background-color: #005fad;
    }
    .form-button:active {
        background-color: #004c87;
    }


        
        `;

    div.appendChild(style);
    this.append(div);
    return div;
  }
}
customElements.define("form-welcome", FormWelcome);
