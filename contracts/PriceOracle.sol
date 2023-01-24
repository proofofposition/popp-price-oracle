// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "popp-interfaces/IPriceOracle.sol";

contract PriceOracle is
Ownable,
IPriceOracle
{
    /** @dev The price of 1 POPP token in USD cents. */
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

    function getPrice() external view returns (uint16) {
        return price;
    }

    /**
    * @dev Get the POPP value (fixed point number) from the USD cents value
    * eg. 100 cents = 1000000000000 POPP
    * @param _usdCents The USD cents value
    */
    function centsToToken(uint256 _usdCents) external view returns (uint256) {
        return (_usdCents * (10 ** 18) /price);
    }
}
