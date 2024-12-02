
// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT


pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("FlexCoin", "FLX") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 2;
    }
}