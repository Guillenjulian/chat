import { Router } from "@vaadin/router";
import { state } from "../../state";

export class FormWelcome extends HTMLElement {
  constructor() {
    super();

    this.render();
    this.connctedCallback();
  }
  connctedCallback() {
    state.subscribe(() => {
      const currenstate = state.getState();

      currenstate.name;
      currenstate.email;
      currenstate.userId;

      this.render();
    });
    const form = this.querySelector(".form");
    // console.log(form, "este es el form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const name = target.name.value;
      const email = target.email.value;
      //   console.log(name, email);
      state.setName(name);
      state.setEmail(email);

      const valorDeSala = target.sala.value;
      //   console.log(valorDeSala);

      const id = state.data.userId;

      state.singIn()?.then(() => {
        state.askNewRoom();
        console.log(state.data.rtdbRoomId, "esta es la page del RTDBROOM");
      });
      if (valorDeSala == id) {
        console.log(state.data.userId, "esto es el valor del state");

        console.log("iguales");
        //
      } else {
        console.log("distintos");

        //  console.log(target.userId.value);
      }
      //      console.log(target.sala.value, "esto es el valor de sala");

      Router.go("/chat");
      this.render();
    });

    const selectRoom: any = form?.querySelector(".selectroom");
    const existingRoom: any = form?.querySelector(".select-sala");
    // console.log(selectRoom);
    selectRoom.addEventListener("change", function (e) {
      const target = e.target as any;

      if (selectRoom.value == "existingroom") {
        existingRoom.style.display = "inline";
      } else {
        existingRoom.style.display = "none";
      }
    });
  }
  comparador() {
    const form = this.querySelector(".form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;

      const valorDeSala = target.sala.value;
      //   console.log(valorDeSala);

      const id = state.data.userId;

      if (valorDeSala == id) {
        state.singIn()?.then(() => {
          state.askNewRoom();
        });
        // console.log(state.data.userId, "esto es el valor del state");

        console.log("iguales");
        //
      } else {
        console.log("distintos");

        //  console.log(target.userId.value);
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
<input  class ="form-input " type ="text" name= "sala" placeholder= " Nombre de la sala">
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
  }
}
customElements.define("form-welcome", FormWelcome);
