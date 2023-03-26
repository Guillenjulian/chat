import * as express from "express";
import { db, rtdb } from "./db";
import * as cors from "cors";
import { uuidv4 } from "@firebase/util";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

const userCol = db.collection("users");
const roomCol = db.collection("rooms");

app.post("/signup", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  console.log("request a signup");

  console.log(email, name);

  userCol
    .where("email", "==", email)
    .get()
    .then((searcheResponse) => {
      if (searcheResponse.empty) {
        userCol
          .add({
            email,
            name,
          })
          .then((newUserRef) => {
            res.json({
              id: newUserRef.id,
            });
          });
      } else {
        res.status(400).json({
          message: "user already exists",
        });
      }
      res.json({});
    });
});

app.post("/auth", (req, res) => {
  const { email } = req.body;

  userCol
    .where("email", "==", email)
    .get()
    .then((searcheResponse) => {
      if (searcheResponse.empty) {
        res.status(404).json({
          message: "not found",
        });
      } else {
        res.json({
          id: searcheResponse.docs[0].id,
        });
      }
    });
});
app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  console.log(userId, "este es el user id");

  userCol
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const roomRef = rtdb.ref("rooms/" + uuidv4());
        roomRef
          .set({
            messages: [],
          })
          .then(() => {
            const roomLongId = roomRef.key;
            const roomId = 1000 + Math.floor(Math.random() * 999);
            roomCol
              .doc(roomId.toString())
              .set({
                rtdrRoomID: roomLongId,
              })
              .then(() => {
                res.json({
                  id: roomId.toString(),
                });
              });
          });
      } else {
        res.status(401).json({
          message: "no existis",
        });
      }
    });
});
app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;
  userCol
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomCol
          .doc(roomId)
          .get()
          .then((snap) => {
            const data = snap.data();

            res.json(data);
          });
      } else {
        res.status(401).json({
          message: "no existis",
        });
      }
    });
});
app.post("/messages", function (req, res) {
  const rtdbRoomId = req.body.rtdbRoomId;

  const chatRommsRef = rtdb.ref("/rooms/" + rtdbRoomId);
  console.log(rtdbRoomId, "esto trae el cliente", req.body);

  chatRommsRef.push(req.body, function (err) {
    console.log("Err");

    res.json("todo ok");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
