require("module-alias/register");

const { createChannel, addListener, sendMeesage } = require("@root/utils/rabbitMQ");
const { doQuerying } = require("@root/utils/MySQL");

const { sendNotification } = require("@root/libs/notification");

const QUEUE_NAME = "notification.fcm";
const TOPIC_NAME = "notification.done";

const FCMHandler = async () => {
  let channel = await createChannel();

  // Listener
  addListener(channel, QUEUE_NAME, listenerCB);
};

const listenerCB = async (msg, channel) => {
  if (msg === null) {
    console.log('Consumer cancelled by server');
    return;
  }

  try {
    let logData = checkInput(msg);
    await sendNotification(logData);
    await logDB(logData);
    await sendDoneMessage(logData, channel);
    channel.ack(msg);
  } catch (e) {
    console.log("failed to process message");
  }


  function checkInput(msg) {
    try {
      let contentStr = msg.content.toString();
      let payload = JSON.parse(contentStr);

      if (!checkProps(payload)) {
        throw "invliad payload format";
      }

      return {
        "deliverAt": new Date().toISOString(),
        "identifier": payload.identifier
      };
    
    } catch (e) {
      console.log("invliad payload format");
      throw e;
    }
  
    function checkProps(obj) {
      const props = {
        "identifier": "string",
        "type": "string",
        "deviceId": "string",
        "text": "string"
      };

      for(let key in props) {
        if (typeof obj[key] !== props[key]) return false;
      }

      return true;
    }
  }

  async function logDB(logData) {
    let query = `INSERT INTO fcm_job (identifier, deliverAt) VALUES ('${ logData.identifier }', '${ logData.deliverAt }')`;

    try {
      await doQuerying(query);
    } catch(e) {
      console.log("failed to insert fcm data to DB with error", e);
      throw e;
    }
  }

  async function sendDoneMessage(logData, channel) {
    try {
      await sendMeesage(channel, TOPIC_NAME, logData);
    } catch (e) {
      console.log("failed to send done message to rabbitMQ with error", e);
      throw e;
    }
  }
};

exports.FCMHandler = FCMHandler;