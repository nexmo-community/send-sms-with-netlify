require('dotenv').config();

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  applicationId: process.env.APP_ID,
  privateKey: Buffer.from(process.env.PRIVATE_KEY, 'utf-8')
});

exports.handler = async (event, context) => {
  try {
    console.dir(JSON.parse(event.body.from));
    nexmo.channel.send(
      {
        "type": 'sms',
        "number": JSON.parse(event.body.from.number)
      },
      {
        "type": 'sms',
        "number": '447418344242'
      },
      {
        content: {
          "type": 'text',
          "text": 'Hello, here is your SMS!'
        }
      },
      (e, data) => {
        if (e) {
          console.error(e);
          return;
        }
        console.log(data);
      }
    );

    return {
      statusCode: 204
    }
  } catch(e) {
    return { statusCode: 500, body: 'Error: ' + e };
  }
};