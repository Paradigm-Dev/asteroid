// import electron from "electron";
// import fs from "fs";
// import path from "path";
import axios from "axios";

export default (uid, newUserData) => {
  axios
    .post(`https://www.theparadigmdev.com/api/asteroid/${uid}`, {
      uid,
      data: newUserData
    })
    .then(response => {})
    .catch(error => console.error(error));
};
