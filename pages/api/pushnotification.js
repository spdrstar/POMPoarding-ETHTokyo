import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

const PK = 'your_channel_address_secret_key'; // channel private key
const Pkey = `0x${PK}`;
const _signer = new ethers.Wallet(Pkey);

const sendNotification = async() => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `Community Leader Signed In:`,
        body: `Confirm in the dashboard`
      },
      payload: {
        title: `Signin Notification`,
        body: `confirm in dashboard`,
        cta: 'https://pomp-ethtokyo.vercel.app/dashboard',
        img: ''
      },
      channel: 'eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
      env: 'production'
    });
  } catch (err) {
    console.error('Error: ', err);
  }
}

sendNotification();