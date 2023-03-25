import firebase from "firebase";
const app = firebase.initializeApp({
  apikey: "sjzgatweX94BmGSY40sQi14XkJRGTGCRkNrxqpRI",
  authDomain: "apx-mod-6-julian.firebaseapp.com ",
  databaseURL: "https://apx-mod-6-julian-default-rtdb.firebaseio.com",
});
const dataBase = firebase.database();

export { dataBase };
