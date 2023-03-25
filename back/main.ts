import * as express from "express";
import { db, rtdb } from "./db";
import * as cors from "cors";
import { uuidv4 } from "@firebase/util";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/messages/", function (req, res) {
  const chatRommsRef = rtdb.ref("/chatrooms/general/messages");
  chatRommsRef.push(req.body, function () {
    res.json("todo ok");
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
