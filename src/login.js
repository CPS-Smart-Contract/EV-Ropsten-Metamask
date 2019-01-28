//UserLoginRegister contract address
const contract_address = "0x9d63606c289e42b18c26d35a6a1b3113f3a607fc";
//UserLoginRegister contract abi
const abi = [{"constant":true,"inputs":[{"name":"_userName","type":"string"},{"name":"_userPassworde","type":"string"}],"name":"checkUserLogin","outputs":[{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userWalletAdress","type":"string"},{"name":"_userName","type":"string"},{"name":"_userPassworde","type":"string"},{"name":"_userType","type":"string"}],"name":"userRegister","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfoStruct","outputs":[{"name":"userWalletAdress","type":"string"},{"name":"userName","type":"string"},{"name":"userPassword","type":"string"},{"name":"userType","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

let contract;
window.addEventListener('load', () => {
    
    //Metamask connection for record transaction 
    if (typeof (web3) === 'undefined') {
        return console.log("Metamask is not installed");
    }
    //UserLoginRegister contract instance
    contract = web3.eth.contract(abi).at(contract_address);

});

//Show account number and balance for current user
web3.eth.getAccounts(function (error, result) {
    if (error != null)
        console.log("Couldn't get accounts");
    console.log(result[0]);

    web3.eth.getBalance(result[0], (err, balance) => {
        balance = this.web3.fromWei(balance, "ether") + " ETH"
        console.log(balance);
    });
});

//Check user login 
function validationcheck() {
    let username = $('#field-username').val();
    let password = $('#field-psw').val();
    //UserLoginRegister send transaction with username and password
    contract.checkUserLogin.sendTransaction(username, password, (error, result) => {
        if (error) {
            return console.log(error);
        }
        else {
            //Transaction hash address
            console.log("txhash: " + result);
            //UserLoginRegister return parameter for forward to the relevant window. 
            contract.checkUserLogin.call(username, password, (error, result) => {
                if (error) {
                    return console.log(error);
                }
                //If the user registered in the system, return true 
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




