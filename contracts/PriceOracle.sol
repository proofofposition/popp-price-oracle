// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "popp-interfaces/IPriceOracle.sol";

contract PriceOracle is
Ownable,
IPriceOracle
{
    uint16 private price;
    /**
     * @dev Set the price of the token in US Cents (fixed point)
     * @param _price The price of the token
     */
    constructor(uint16 _price) {
        setPrice(_price);
    }

    function setPrice(uint16 _price) public onlyOwner {
        price = _price;
    }

    function getPrice() public view returns (uint16) {
        return price;
    }
}
