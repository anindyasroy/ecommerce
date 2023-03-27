// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";

contract fakeToken is ERC20("Fake Token", "FT") {
    function mintTwenty() public {
        _mint(msg.sender, 20);
    }
}

contract anotherToken is ERC20("AnotherFakeToken", "AFT") {
    function mintTwenty() public {
        _mint(msg.sender, 20);
    }
}
