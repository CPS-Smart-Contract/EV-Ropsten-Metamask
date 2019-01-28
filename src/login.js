
const contract_address = "0x9d63606c289e42b18c26d35a6a1b3113f3a607fc";
const abi = [{"constant":true,"inputs":[{"name":"_userName","type":"string"},{"name":"_userPassworde","type":"string"}],"name":"checkUserLogin","outputs":[{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userWalletAdress","type":"string"},{"name":"_userName","type":"string"},{"name":"_userPassworde","type":"string"},{"name":"_userType","type":"string"}],"name":"userRegister","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfoStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userPassword","type":"string"},{"name":"userType","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

let contract;
window.addEventListener('load', () => {
    if (typeof (web3) === 'undefined') {
        return console.log("Metamask is not installed");
    }
    contract = web3.eth.contract(abi).at(contract_address);

});

web3.eth.getAccounts(function (error, result) {
    if (error != null)
        console.log("Couldn't get accounts");
    console.log(result[0]);

    web3.eth.getBalance(result[0], (err, balance) => {
        balance = this.web3.fromWei(balance, "ether") + " ETH"
        console.log(balance);
    });
});

function validationcheck() {
    let username = $('#field-username').val();
    let password = $('#field-psw').val();
    contract.checkUserLogin.sendTransaction(username, password, (error, result) => {
        if (error) {
            return console.log(error);
        }
        else {
            console.log("txhash: " + result);
            contract.checkUserLogin.call(username, password, (error, result) => {
                if (error) {
                    return console.log(error);
                }
                if (result[1] == true) {
                    var actionName = result[0] + ".html";
                    if (actionName != "") {
                        console.log(actionName);
                        document.getElementById("form_id").action = actionName;
                        document.getElementById("form_id").submit();
                    } else {
                        alert("Please set form action");
                    }
                }
                else {
                    // If status value is false, return error.
                    console.log(result[0]);
                }
            });
        }
    });

}




