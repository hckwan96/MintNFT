import dotenv from 'dotenv';
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


async function run() {
    const helia = await createHelia();
    const ipfs = dagJson(helia);

    const metadata = {
        name: "My First NFT",
        attributes: [
            {
                "trait_type": "Zoom Background",
                "value": "10" 
            },
            {
                "trait_type": "Yellow",
                "value": "100"
            },
            {
                "trait_type": "Visiber Logo",
                "value": "1000"
            },
            {
                "trait_type": "57Society Logo",
                "value": "1000"
            }
        ],
        image: "https://ipfs.io/ipfs/QmPgmrbXTfHPV7ZaNZhsmrmz8foJZQ4LoETakCSdJFPaAw",
        description: "Zoom background image"
    };


    try {
        const result = await ipfs.add(metadata);

        const linkMeta = {link : result};
        const myLinkMetaAddress = await ipfs.add(linkMeta);

        const retrievedObject = await ipfs.get(myLinkMetaAddress);

        console.log("myLinkMetaAddress", myLinkMetaAddress)
        console.log("retrievedObject", retrievedObject)

        // const object1 = {hello: 'world from Asia'};
        // const myImmutableAddress1 = await ipfs.add(object1);

        // const object2 = {link : myImmutableAddress1};
        // const myImmutableAddress2 = await ipfs.add(object2);

        // const retrievedObject1 = await ipfs.get(myImmutableAddress2);
        // console.log(retrievedObject1)


        console.log('IPFS Upload Result:', result);
        // console.log('Metadata URL:', `https://ipfs.io/ipfs/${result.path}`);
        // Verify the upload
        // try {
        //     const verified = await ipfs.pin.ls(result.path);
        //     console.log('Pin verification:', verified);
        // } catch (pinError) {
        //     console.warn('Pin verification failed:', pinError.message);
        // }
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        if (error.message) {
            console.error('Error message:', error.message);
        }
    }
}

run()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Error in main process:', error);
        process.exit(1);
    });