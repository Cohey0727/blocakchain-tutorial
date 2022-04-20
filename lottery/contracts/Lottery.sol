// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Lottery {
    address public manager;
    address[] public players;
    bool public finished = false;
    address public winner;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable notFinished {
        require(msg.value == 0.01 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint256) {
        bytes memory seed = abi.encodePacked(
            block.difficulty,
            block.timestamp,
            players
        );
        return uint256(keccak256(seed));
    }

    function pickWinner() public onlyManager notFinished {
        finished = true;
        uint256 index = random() % players.length;
        winner = players[index];
        payable(winner).transfer(address(this).balance);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function getBalane() public view returns (uint256) {
        return address(this).balance;
    }

    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }

    modifier notFinished() {
        require(!finished);
        _;
    }
}
