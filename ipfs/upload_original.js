require('dotenv').config();

async function run() {
    const { create } = await import('ipfs-http-client');

    const projectId = process.env.INFURA_API_KEY;
    const projectSecret = process.env.INFURA_SECRET;
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

    const ipfs = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth,
        },
        fetchOptions: {
            duplex: 'half'
        }
    });
    
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
        // Convert the metadata to a Buffer
        const metadataBuffer = Buffer.from(JSON.stringify(metadata));

        // Upload to IPFS with proper options for Node.js 18+
        const result = await ipfs.add(metadataBuffer, {
            progress: (prog) => console.log(`Upload progress: ${prog}`),
            pin: true
        });

        console.log('IPFS Upload Result:', result);
        console.log('Metadata URL:', `https://ipfs.io/ipfs/${result.path}`);
        console.log('Infura Gateway URL:', `https://ipfs.infura.io/ipfs/${result.path}`);
        
        // Verify the upload
        try {
            const verified = await ipfs.pin.ls(result.path);
            console.log('Pin verification:', verified);
        } catch (pinError) {
            console.warn('Pin verification failed:', pinError.message);
        }
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