const TrashTag = artifacts.require("TrashTag");
const Strings = artifacts.require("Strings");

module.exports = function (deployer) {
    deployer.deploy(TrashTag);
    deployer.deploy(Strings);
};