require('dotenv').config();

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  applicationId: process.env.APP_ID,
  privateKey: Buffer.from(process.env.PRIVATE_KEY)
});

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
}

exports.handler = async (event, context) => {
  console.log(event.body);

  try {
    var from = JSON.parse(event.body).from;
    
    nexmo.channel.send(
      {
        "type": 'sms',
        "number": from.number
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
      headers,
      statusCode: 204,
      body: "ok"
    }
  } catch(e) {
    return { headers, statusCode: 500, body: 'Error: ' + e };
  }
};