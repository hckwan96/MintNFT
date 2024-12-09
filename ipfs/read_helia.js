import { createHelia } from "helia";
import { dagJson } from "@helia/dag-json";

if (typeof global.CustomEvent !== "function") {
  global.CustomEvent = class CustomEvent extends Event {
    constructor(event, params = { bubbles: false, cancelable: false, detail: null }) {
      super(event, params);
      this.detail = params.detail;
    }
  };
}

async function readIPFSFile(cid) {
  const helia = await createHelia();
  const ipfs = dagJson(helia);

  try {
    const file = await ipfs.get(cid);
    console.log('Retrieved file:', file);
    process.exit(0);
  } catch (error) {
    console.error('Error retrieving file from IPFS:', error);
    process.exit(1);
  }
}

readIPFSFile('baguqeerampfpapcbqbgnsclr3fsudxmee2qsyfgofo3qypawfb3tfcokr6zq');
