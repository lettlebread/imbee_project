require("module-alias/register");

const { initMySQLClient } = require("@root/utils/MySQL");
const { FCMHandler } = require("@root/handler/FCM");

const setupApp = async () => {
  try {
    await initMySQLClient();
    FCMHandler();
  } catch (e) {
    console.log(e);
  }
}; 

exports.setupApp = setupApp;