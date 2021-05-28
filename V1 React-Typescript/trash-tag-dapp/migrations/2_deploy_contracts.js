const trashtag = artifacts.require("TrashTag");
const Strings = artifacts.require("Strings");

module.exports = function (deployer) {
    deployer.deploy(trashtag);
    deployer.deploy(Strings);
};