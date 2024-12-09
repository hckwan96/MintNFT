import { createHelia } from 'helia';
import { dagJson } from '@helia/dag-json';

if (typeof global.CustomEvent !== "function") {
  global.CustomEvent = class CustomEvent extends Event {
    constructor(event, params = { bubbles: false, cancelable: false, detail: null }) {
      super(event, params);
      this.detail = params.detail;
    }
  };
}

async function uploadWithHelia(metadata) {
  const helia = await createHelia();
  const ipfs = dagJson(helia);

  try {
    const cid = await ipfs.add(metadata);
    console.log('File uploaded to Helia, CID:', cid);
    process.exit(0);
  } catch (error) {
    console.error('Error uploading file to Helia:', error);
  }
}

const metadata = {
  name: 'My First NFT',
  description: 'This is metadata stored using Helia and dag-json.',
};
uploadWithHelia(metadata);