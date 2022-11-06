require("module-alias/register");

const { createFirebaseAdmin } = require("@root/utils/firebase");

async function sendNotification(notificationData) {
  try {
    const admin = createFirebaseAdmin();
    const payload = createPushPayload(notificationData);

    const res = await admin.messaging().send(payload);

    if (typeof res !== "string") {
      throw "send notification failed";
    }
  } catch (e) {
    console.log("send notification with error", e);
    throw e;
  }

  function createPushPayload(notificationData) {
    const payload = {
      notification: {
        title: "Incoming message",
        body: notificationData.text,
      },
      topic: "test"
    };

    return payload;
  }
}

exports.sendNotification = sendNotification;