import { dataBase } from "./db";
import { map } from "lodash";
const API_BASE_URL = "http://localhost:3000";

type Message = {
  from: string;
  message: string;
};

const state = {
  data: {
    name: "",

    messages: {},
  },
  listeners: [],
  init() {
    const chatroomsRef = dataBase.ref("/chatrooms/general");
    const currentState = this.getState();
    chatroomsRef.on("value", (snapshot) => {
      const messagesFromServer = snapshot.val();
      const messagesList = map(messagesFromServer.messages);
      currentState.messages = messagesList;
      this.setState(currentState);
    });
  },
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    //console.log(newState);

    for (const cd of this.listeners) {
      cd();
    }
    console.log("soy el statey e cambiado", newState);
  },
  setName(name: string) {
    const currenstate = this.getState();
    currenstate.name = name;
    // console.log(name, "este es el nombre desde el state");

    this.setState(currenstate);
  },
  //   setEmail(email: string) {
  //     const currenstate = this.getState();
  //     this.setState({ ...currenstate, email });
  //   },
  //   setMessage(message: any) {
  //     const currenstate = this.getState();
  //     this.setState({ ...currenstate, message });
  //   },
  pushManager(messages: string) {
    const currenState = this.getState();
    //console.log(currenState, "desde el push");
    const nameFromState = currenState.name;
    //  console.log(nameFromState, "este es el pushmessage");
    const messageFromState = currenState.messages;
    // console.log(messageFromState);

    fetch(API_BASE_URL + "/messages", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: nameFromState,
        message: messages,
      }),
    });
    this.setState(currenState);
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
