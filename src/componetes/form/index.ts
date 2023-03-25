import { state } from "../../state";

type Message = {
  name: string;
  message: string;
};

export class Header extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.conncTedCallback();
  }

  conncTedCallback() {
    state.subscribe(() => {
      const currenstate = state.getState();
      const messageFromState = currenstate.messages;
      this.messages = messageFromState;
      this.render();
    });
    this.render();
  }
  messages: Message[] = [];
  addLissteners() {
    const form = this.querySelector(".submit-message") as any;
    form.addEventListener("submit", (e: any) => {
      e.preventDefault();
      const target = e.target as any;
      state.pushManager(target["new-message"].value);
      // console.log(target["new-message"].value);
      this.render();
    });
  }
  render() {
    const div = document.createElement("div");

    div.className = "container";
    div.innerHTML = `
    <div class = "messages">
    <div>
    ${this.messages
      .map((m) => {
        let name = state.data.name;
        let userName = "";
        if (name === m.name) {
          userName = "user";
        }
        if (name !== m.name) {
          userName = "otroUser";
        }

        return `  <div>
        <li  class = "messages-container">
        <div  class=" li_spam">${m.name}
        </div>
        
        <div class ="${userName}">
        <p> ${m.message}</p>
        </div>
        
        </li>
        `;
      })
      .join("")}
    </div>
      <form class= "submit-message">
        <input class= "imput" type="text"  name="new-message"  ><br>
      
        <button class="button">Ingresar</button>
        </form>
        </div>
      `;
    const style = document.createElement("style");
    style.innerHTML = `

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;
      background-color: #f9f9f9;
    }
    
    .messages {
      margin-top: 20px;
      margin-bottom: 20px;
      padding: 10px;
      border-radius: 5px;
      background-color: #ffffff;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
      height: 100%;
      width:312px ;

    }
    
    .message {
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 5px;
      background-color: #d2f7c1;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
      font-size: 14px;
      line-height: 1.5;
    }
    
    .message strong {
      font-weight: bold;
    }
    
    .submit-message {
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 20px;
      padding: 10px;
      border-radius: 5px;
      background-color: #ffffff;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
    }
    
    

    .imput {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      background-color: #fff;
      font-size: 14px;
      line-height: 1.5;
    }
    
    .button {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: none;
      border-radius: 5px;
      background-color: #0077cc;
      color: #ffffff;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    @media (min-width: 768px) {
      .container {
        max-width: 768px;
        margin: 0 auto;
      }
    }
    .messages-container{
        display: flex;
        flex-direction: column;
        height: 100%;
        gap:7px;
      }
    .messages-container strong{
      font-weight: bold;
    }

      
      li {
        list-style-type: none;
      }
      
      
      .messages-container
      .user {
      border-radius: 5px;
      text-align: right;
      background-color:#B9E97C ;
      font-size: 17px;
    }
    
    .li_spam{
      font-size: 14px;
    }
    
    .messages-container
    .otroUser{
      text-align: left;
      border-radius: 5px;
      background-color:#D8D8D8 ;
      font-size: 17px;
    }
    `;

    div.appendChild(style);

    this.innerHTML = ``;
    this.append(div);
    this.addLissteners();
  }
}
customElements.define("form-element", Header);
