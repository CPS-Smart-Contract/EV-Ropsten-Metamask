pragma solidity ^0.4.18;//Solidity versiyon 0.4.18

contract UserLoginRegister
{
    struct UserInfoStruct // This struct created to store all users information
    {
        string userWalletAdress;// User's ethereum wallet adress
        string userName;// Can be a person or a company
        string userPassword;// User password
        string userType;// user type means Energy Producer, Grid Operator,  Energy Trader, Energy Station
    }
    UserInfoStruct[] public userInfoStruct;
    uint registeredUserLength=0;// to store number of registered users
    
    // Constructor function we are adding default users for each userType
    function UserLoginRegister() public
    {
        userInfoStruct.push(UserInfoStruct("0x81Dc5632fEc65afbAceFF2c88a7594E0a28A6319","baran","1234","EnergyProducer"));
        userInfoStruct.push(UserInfoStruct("0xA71fd2fcC1451c95DAeA17Ad28fb9C71f72DEb78","caner","1234","EnergyGridOperator"));
        userInfoStruct.push(UserInfoStruct("0x65A6e942F95D95014c2c69F938bF3c4fFa31658C","yasin","1234","EnergyTrader"));
        userInfoStruct.push(UserInfoStruct("0xde966ebb5719d6c1c5531cE13fD9a9870eE16067","ugur","1234","EnergyStation"));

        registeredUserLength=4;//In the struct there is 4 users and their datas
    }
    
    // Add new user to struct
    function userRegister(string _userWalletAdress,string _userName,string _userPassworde,string _userType)public view returns (string)
    {
        for(uint i=0;i<registeredUserLength;i++)
        {
            if(keccak256(userInfoStruct[i].userName) ==keccak256( _userName)) // keccak256 is needed for string compare. If result is true
            {
               return "Invalid user...";
            }
        }
       userInfoStruct.push(UserInfoStruct(_userWalletAdress,_userName,_userPassworde,_userType));// Push operation
       registeredUserLength++; // We must increase registeredUserLength after adding user
       return "Registration successful...";
    }
    
    // Check user informations for login web pages
    function checkUserLogin(string _userName,string _userPassworde) public view returns (string,bool)
    {
        for(uint i=0;i<registeredUserLength;i++)
        {
            if(keccak256(userInfoStruct[i].userName) ==keccak256( _userName)) // keccak256 is needed for string compare. If result is true
            {
                if(keccak256(userInfoStruct[i].userPassword) == keccak256(_userPassworde)) // then compare password. If result is 
                {
                    return (userInfoStruct[i].userType,true);// then return user informations.
                }
            }
        }
        return("Error",false);// If there is not any match, then return false.
    }
}
