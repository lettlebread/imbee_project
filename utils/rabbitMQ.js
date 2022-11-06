const amqplib = require('amqplib');
require('dotenv').config();

const createChannel = async () => {
  try {
    const conn = await amqplib.connect(process.env.MQ_HOST);
    const channel = await conn.createChannel();
  
    return channel;
  } catch (e) {
    console.log("failed to connect to rabbitMQ with error", e);
    throw e;
  }

};

const addListener = async (channel, queueName, cb) => {
  try {
    await channel.assertQueue(queueName);

    channel.consume(queueName, (msg)=> {
      cb(msg, channel);
    });
  } catch(e) {
    console.log("error in addListener", e);
    throw e;
  }
};

const sendMeesage = async (channel, queueName, payload) => {
  try {
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));
  } catch(e) {
    console.log("error in sendMeesage", e);
    throw e;
  }
};

exports.createChannel = createChannel;
exports.addListener = addListener;
exports.sendMeesage = sendMeesage;