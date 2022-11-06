require("module-alias/register");
require('dotenv').config();

let admin = require("firebase-admin");

const createFirebaseAdmin = () => {
  let data = require(`@root/${process.env.FIREBASE_KEY}`);

  admin.initializeApp({
    credential: admin.credential.cert(data),
  });

  return admin;
}

exports.createFirebaseAdmin = createFirebaseAdmin