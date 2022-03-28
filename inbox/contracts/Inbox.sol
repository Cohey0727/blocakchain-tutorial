// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Inbox {
    string public message;
    int256 private age;

    constructor(string memory initialMessage, int256 initialAge) {
        message = initialMessage;
        age = initialAge;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function getAge() public view returns (int256) {
        int256 res = 0;
        for (int256 i; i < 1000; i++) {
            res += i;
        }
        return age;
    }
}
