import * as admin from "firebase-admin";
import * as serviceAccount from "./key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://apx-mod-6-julian-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
const rtdb = admin.database();
//console.log(db, "esta es la dataBase");
//console.log(rtdb, "estas es las reaalTimeDataBase");

export { db, rtdb };
