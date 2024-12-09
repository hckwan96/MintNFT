const { ethers } = require('hardhat');

async function deployAndMintNFT() {
  try {
    // if you changed the name of the contract, be sure to update this here!
    const KHCToken = await ethers.getContractFactory("KHCToken");

    const nft = await KHCToken.deploy();  // Fixed: Changed MyToken to KHCToken
    await nft.deployed();

    console.log("NFT deployed to:", nft.address);
 
    // mint one to yourself!
    const signer0 = await ethers.provider.getSigner(0);
    // update the IPFS CID to be your metadata CID
    await nft.safeMint(
      await signer0.getAddress(), 
      "ipfs://QmPgmrbXTfHPV7ZaNZhsmrmz8foJZQ4LoETakCSdJFPaAw"
    );

    console.log("NFT Minted!");
    return nft.address;
  } catch (error) {
    console.error("Error deploying or minting NFT:", error);
    throw error;
  }
}

// You can either export the function
module.exports = deployAndMintNFT;

// Or run it directly
if (require.main === module) {
  deployAndMintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}