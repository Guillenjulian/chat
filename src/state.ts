import { dataBase } from "./db";
import { map } from "lodash/map";
const API_BASE_URL = "http://localhost:3000";

const state = {
  data: {
    rtdbRoomId: "",
    name: "",
    email: "",
    userId: "",
    roomId: "",
    messages: [],
  },
  listeners: [],
  init() {
    if (window.localStorage.getItem("state")) {
      const local: any = window.localStorage.getItem("state");
      const localParseado = JSON.parse(local);
      //  console.log("localStorage:::::::", localParseado);
      this.setState(localParseado);

      this.listenRoom();
    }
  },
  listenRoom() {
    const currentstate = this.getState();
    const rtdbRoomId = currentstate.rtdbRoomId;
    const chatroomsRef = dataBase.ref("/rooms/" + rtdbRoomId);
    chatroomsRef.on("value", (snapshot) => {
      const messagesFromServer = snapshot.val();
      const messagesList = map(messagesFromServer);
      currentstate.messages = messagesList;
      this.setState(currentstate);
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
    localStorage.setItem("state", JSON.stringify(newState));
  },
  setName(name: string) {
    const currenstate = this.getState();
    currenstate.name = name;
    //console.log(name, "este es el nombre desde el state");

    this.setState(currenstate);
  },
  setEmail(email: string) {
    const currenstate = this.getState();
    currenstate.email = email;

    this.setState(currenstate);
  },
  singIn() {
    const currenstate = this.getState();

    const emailFromState = currenstate.email;

    if (emailFromState) {
      return fetch(API_BASE_URL + "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: emailFromState,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          currenstate.userId = data.id;
          console.log(currenstate.userId);

          this.setState(currenstate);
        });
    } else {
      console.error("no hay un Email en el state");
    }
  },
  askNewRoom() {
    const currenstate = this.getState();
    if (currenstate.userId) {
      fetch(API_BASE_URL + "/rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: currenstate.userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          currenstate.roomId = data.id;
          console.log(data, "esta es la data desde ask");

          this.accesToRoom(currenstate.roomId);
          this.setState(currenstate);

          //  console.log("este es el currend desde el ask", currenstate);
        });
    } else {
      console.log("no hay user id");
    }
  },
  accessToRoom() {
    const currenstate = this.getState();
    const userId = currenstate.userId;
    const roomId = currenstate.roomId;

    console.log(userId, roomId, "este es el acces");
    console.log(roomId);

    return fetch(API_BASE_URL + "/rooms/" + roomId + ".?userId=" + userId, {})
      .then((res) => res.json())
      .then((data) => {
        console.log("id del room desdela api", data);
        currenstate.rtdbRoomId = data.rtdbRoomId;

        this.setState(currenstate);
        this.listenRoom();
      });
  },

  pushManager(messages: string) {
    const currenstate = this.getState();
    //  console.log(currenstate, "desde el push");
    const nameFromState = currenstate.name;
    //console.log(nameFromState, "este es el pushmessage");
    const messageFromState = currenstate.messages;
    //console.log(messageFromState);
    const rtdbRoomIdFromState = currenstate.rtdbRoomId;
    console.log(rtdbRoomIdFromState, "este es desde menssages");

    fetch(API_BASE_URL + "/messages", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: nameFromState,
        message: messageFromState,
        rtdbRoomId: currenstate.rtdbRoomId,
      }),
    }).then(() => this.listenRoom());
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
