//Post Method
var queries = decodeURIComponent(window.location.search);
queries = queries.substring(1);
var username = queries.split("=");
console.log(username[1]);
document.getElementById("grdOpName").value = username[1];
document.getElementById("grdOpName").disabled = true;

//Conrtact adress
const contractAddress = "0x71b8bd65b05b20b8937bd315756c25085b1a5a86";
// Initialize contract with its ABI
const abi = [{ "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getMinEnergyPriceAccordingToOwnerType", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "productInfoStruct", "outputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "ownerType", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "startIndex", "type": "uint256" }, { "name": "wantedOwnerType", "type": "uint256" }], "name": "wantedValueofProductInfoStruct", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_ownerType", "type": "uint256" }], "name": "getAnOwnerLength", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "ownerName", "type": "string" }, { "name": "energyPrice", "type": "uint256" }, { "name": "_ownerType", "type": "uint256" }, { "name": "profitRate", "type": "uint256" }], "name": "addOffer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }];
let contract = web3.eth.contract(abi).at(contractAddress);//Metamask Injected web3 conract

if (typeof (web3) == "undefined") {
    console.log("Metamask is not installed...");
} else {
    console.log("Metamask is installed...");
}

/* Use getMinEnergyPriceAccordingToOwnerType funtion of smart contract to get best value of all
offers. In this page ownerType parametre is o. Because, Grid operators need Energy Producers's offers. */
contract.getMinEnergyPriceAccordingToOwnerType.call(0, (error, result) => {
    if (!error) {
        $("#station").html('Best Price is ' + result[1] + '$. from ' + result[0]);//Give output to user.
        console.log(result);
    } else
        console.error(error);
});
getAllOffers();
//Bring all offers to showing on table
function getAllOffers() {
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/6d4da4e3a05d48c0b5323373510a61da"));
    // Injected web3 provider contract
    let contract1 = web3.eth.contract(abi).at(contractAddress);
    var length = contract1.getAnOwnerLength(0);
    var index = 0;
    for (i = 0; i < length; i++) {
        //Smart contract function. Find the next Energy Producer.
        result = contract1.wantedValueofProductInfoStruct(index, 0);
        var table = document.getElementById("myTable");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = result[0];//Add Table
        cell2.innerHTML = result[1];//Add Table
        // New index is return value of smart contract function.
        index = result[2];
    }
}
function setOffer() {
    //Use addOffer function of deployed smart contract in web3 Metamask Provider. Send parametres to add new offer.
    contract.addOffer.sendTransaction($("#grdOpName").val(), $("#grdOpPrice").val(), 1, $("#grdOpPrfRate").val(),
        { from: web3.eth.accounts[0], gas: 3000000 },
        (error, result) => {
            if (error) {
                return console.log(error);
            } else {
                console.log("txHash= " + result);
            }
        }
    );
    document.getElementById("grdOpPrice").value = "";
    document.getElementById("grdOpPrfRate").value = "";
}