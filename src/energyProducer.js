//Username post method
var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
//console.log(username[1]);
document.getElementById("prName").value = username[1];
document.getElementById("prName").disabled = true;

//ElectricVehicleChargingEnergyTradeSystem contract address
const contractAddress = "0x71b8bd65b05b20b8937bd315756c25085b1a5a86";
//ElectricVehicleChargingEnergyTradeSystem contract abi
const abi = [{ "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getMinEnergyPriceAccordingToOwnerType", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "productInfoStruct", "outputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "ownerType", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "wantedValueofProductInfoStruct", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getAnOwnerLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "_ownerType", "type": "uint256" }, { "name": "profitRate", "type": "uint256" }], "name": "addOffer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }];
//ElectricVehicleChargingEnergyTradeSystem contract instance
let contract = web3.eth.contract(abi).at(contractAddress);

window.addEventListener('load', () => {
    //Metamask connection for record transaction 
    if (typeof (web3) == "undefined") {
        console.log("Metamask is not installed...");
    } else {
        console.log("Metamask is installed...");
    }
});
function setOffer() {
    //Use addOffer function of deployed smart contract in web3 Metamask Provider. Send parametres to add new offer.
    contract.addOffer.sendTransaction($("#prName").val(), $("#prPrice").val(), 0, 0,
        { from: web3.eth.accounts[0], gas: 3000000 },
        (error, result) => {
            if (error) {
                return console.log(error);
            }
            else {
                //If the registration succesfully, show the transaction number
                console.log("txHash= " + result);
            }
        }
    );
    document.getElementById("prPrice").value = "";
}