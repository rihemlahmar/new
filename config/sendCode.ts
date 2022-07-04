import {Twilio} from 'twilio'
const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const serviceID=`${process.env.TWILIO_SERVICE_ID}`;

const client = new Twilio(accountSid, authToken);

             
export const sendCode = async(to: string, channel: string) => {

  try {
    const data = await client
      .verify
      .services(serviceID)
      .verifications
      .create({
        to,
        channel
      })

    return data;
  } catch (err) {
    console.log(err)
  }
}

export const codeVerify = async(to: string, code: string) => {
  try {
    const data = await client
      .verify
      .services(serviceID)
      .verificationChecks
      .create({
        to,
        code
      })
      
    return data;
  } catch (err) {
    console.log(err)
  }
}