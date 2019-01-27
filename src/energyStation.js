var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
console.log(username[1]);
document.getElementById("curruser").value = username[1];
document.getElementById("curruser").disabled = true;

const contractAddress = "0x76bae75af2f5e7e550f9dd41faa00cd4d64a8b78";
const abi = [{ "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getMinEnergyPriceAccordingToOwnerType", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "productInfoStruct", "outputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "ownerType", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "wantedValueofProductInfoStruct", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getAnOwnerLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "_ownerType", "type": "uint256" }, { "name": "profitRate", "type": "uint256" }], "name": "addOffer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }];
let contract = web3.eth.contract(abi).at(contractAddress);//Metamask Injected web3 conract
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
        $("#station").html('Best Price is ' + result[1] + '$. from ' + result[0]);//Give output to user.
        console.log(result);
    } else
        console.error(error);
});
getAllOffers();

function getAllOffers() {
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/6d4da4e3a05d48c0b5323373510a61da"));
    let contract1 = web3.eth.contract(abi).at(contractAddress);// Injected web3 provider contract
    var length = contract1.getAnOwnerLength(2);
    var index = 0;
    for (i = 0; i < length; i++) {
        result = contract1.wantedValueofProductInfoStruct(index, 2);//Smart contract function. Find the next Energy Producer.
        var table = document.getElementById("myTable");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = result[0];//Add Table
        cell2.innerHTML = result[1];//Add Table
        index = result[2];// New index is return value of smart contract function.
    }

}