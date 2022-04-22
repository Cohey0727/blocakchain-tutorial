// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Lottery {
  address public manager;
  address[] public players;
  address public prevWinner;

  constructor() {
    manager = msg.sender;
  }

  function enter() public payable {
    require(msg.value == 0.01 ether);
    players.push(msg.sender);
  }

  function random() private view returns (uint256) {
    bytes memory seed = abi.encodePacked(block.difficulty, block.timestamp, players);
    return uint256(keccak256(seed));
  }

  function pickWinner() public onlyManager {
    uint256 index = random() % players.length;
    prevWinner = players[index];
    payable(prevWinner).transfer(address(this).balance);
    players = new address[](0);
  }

  function getPlayers() public view returns (address[] memory) {
    return players;
  }

  modifier onlyManager() {
    require(msg.sender == manager);
    // call modified function
    _;
  }
}
