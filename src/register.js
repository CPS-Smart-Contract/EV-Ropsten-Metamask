
const contract_address = "0x9d63606c289e42b18c26d35a6a1b3113f3a607fc";
const abi = [{ "constant": true, "inputs": [{ "name": "_userName", "type": "string" }, { "name": "_userPassworde", "type": "string" }], "name": "checkUserLogin", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_userWalletAdress", "type": "string" }, { "name": "_userName", "type": "string" }, { "name": "_userPassworde", "type": "string" }, { "name": "_userType", "type": "string" }], "name": "userRegister", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "userInfoStruct", "outputs": [{ "name": "userWalletAdress", "type": "string" }, { "name": "userName", "type": "string" }, { "name": "userPassword", "type": "string" }, { "name": "userType", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }];

let contract;

web3.eth.getAccounts(function (error, result) {
    if (error != null)
        console.log("Couldn't get accounts");
    console.log(result[0]);

    document.getElementById('field-userWalletAddress').value = result[0];
    document.getElementById('field-userWalletAddress').disabled = true;

    web3.eth.getBalance(result[0], (err, balance) => {
        balance = this.web3.fromWei(balance, "ether") + " ETH"
        console.log(balance);
    });
});

function userRegister() {
    try {
        var _userWalletAddress = document.getElementById('field-userWalletAddress').value;

        var _userName = document.getElementById('field-userName').value;
        var _userPassword = document.getElementById('field-password').value;
        // Html select tag definition for selected user type.
        var e = document.getElementById("field-userType");
        var userType = e.options[e.selectedIndex].value;

        // If user wallet address is empty, focus this field.
        if (_userWalletAddress == "") {
            console.log('please enter user wallet address');
            document.myregister.input_userWalletAddress.focus();
        }
        // If user name is empty, focus this field.
        else if (_userName == "") {
            console.log('please enter username');
            document.myregister.input_userName.focus();
        }
        // If user password is empty, focus this field.
        else if (_userPassword == "") {
            console.log('please enter password');
            document.myregister.input_userPassword.focus();
        }
        else {
            if (typeof (web3) === 'undefined') {
                return console.log("Metamask is not installed");
            }
            contract = web3.eth.contract(abi).at(contract_address);

            contract.userRegister.sendTransaction(_userWalletAddress, _userName, _userPassword, userType, (error, result) => {
                if (error) {
                    return console.log(error);
                }
                else {
                    console.log("txhash: " + result);
                    contract.userRegister.call(_userWalletAddress, _userName, _userPassword, userType, (error, result) => {
                        if (error) {
                            return console.log(error);
                        }
                        else {
                            console.log(result);
                            if (result != "Invalid user...") {
                                document.getElementById('field-userName').value = "";
                                document.getElementById('field-password').value = "";

                            } else {
                                alert(result);
                            }

                        }

                    });
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}


