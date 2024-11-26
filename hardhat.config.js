require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks:{
    local:{
    url:"http://127.0.0.1:8545"
    },
  holesky:{
      url:process.env.ALCHEMY_API,
      accounts:[process.env.PRIVATE_KEY]
    }
  },
  solidity: "0.8.26",
};
