const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MedexaModule", (m) => {
  const medexa = m.contract("Medexa"); // same contract name should be used

  return { medexa };
});
