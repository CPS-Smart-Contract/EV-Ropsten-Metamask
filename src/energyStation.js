// Post methots
var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
console.log(username[1]);
document.getElementById("curruser").value = username[1];
document.getElementById("curruser").disabled = true;

// Address of smart contract
const contractAddress = "0x71b8bd65b05b20b8937bd315756c25085b1a5a86";,
//Metamask Injected web3 conract.
const abi = [{ "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getMinEnergyPriceAccordingToOwnerType", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "productInfoStruct", "outputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "ownerType", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "wantedValueofProductInfoStruct", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getAnOwnerLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "_ownerType", "type": "uint256" }, { "name": "profitRate", "type": "uint256" }], "name": "addOffer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }];
//Metamask Injected web3 conract
let contract = web3.eth.contract(abi).at(contractAddress);
//window.addEventListener('load', () => {
if (typeof (web3) == "undefined") {
    console.log("Metamask is not installed...");
} else {
    console.log("Metamask is installed...");
}

/* Use getMinEnergyPriceAccordingToOwnerType funtion of smart contract to get best value of all
offers. In this page ownerType parametre is o. Because, Grid operators need Energy Producers's offers. */
contract.getMinEnergyPriceAccordingToOwnerType.call(2, (error, result) => {
    if (!error) {
        //Give output to user.
        $("#station").html('Best Price is ' + result[1] + '$. from ' + result[0]);
        console.log(result);
    } else
        console.error(error);
});
getAllOffers();
// Funtion to list all related offer.
function getAllOffers() {
    // Connecting to infura node.
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/6d4da4e3a05d48c0b5323373510a61da"));
    // Injected web3 provider contract.
    let contract1 = web3.eth.contract(abi).at(contractAddress);
    var length = contract1.getAnOwnerLength(2);
    var index = 0;
    for (i = 0; i < length; i++) {
        //Smart contract function. Find the next Energy Producer.
        result = contract1.wantedValueofProductInfoStruct(index, 2);
        var table = document.getElementById("myTable");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = result[0];
        cell2.innerHTML = result[1];
        // New index is return value of smart contract function.
        index = result[2];
    }

}