const Strings = artifacts.require("Strings");
const TrashtagDAPP = artifacts.require("TrashtagDAPP");



module.exports = function (deployer) {
    deployer.deploy(TrashtagDAPP);
    deployer.deploy(Strings);

};