// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract marketplaceItem1 {
    AggregatorV3Interface internal priceFeed =
        AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);

    mapping(address => bool) public alreadyBought;
    uint public price = 10 * 10 ** 18;
    address public owner = payable(msg.sender);

    IERC20 public fakeToken =
        IERC20(0x7F0Ff331e18EBf0Ea65CD9146659D8aC2160287E);
    IERC20 public anotherToken =
        IERC20(0x379C36d38252D5674e2707b6eE276a5Fb8Ba1097);

    function payInFT() public returns (bool) {
        require(
            alreadyBought[msg.sender] == false,
            "You already bought this item"
        );
        fakeToken.transferFrom(msg.sender, owner, price);
        alreadyBought[msg.sender] = true;
        return alreadyBought[msg.sender];
    }

    function payInAFT() public returns (bool) {
        require(
            alreadyBought[msg.sender] == false,
            "You already bought this item"
        );
        anotherToken.transferFrom(msg.sender, owner, price);
        alreadyBought[msg.sender] = true;
        return alreadyBought[msg.sender];
    }

    function getCurrentPriceOfETH() public view returns (int) {
        (
            ,
            /*data1*/ int priceOfUSD /*data2*/ /*data3*/ /*data4*/,
            ,
            ,

        ) = priceFeed.latestRoundData();
        return priceOfUSD / 10 ** 8;
    }

    function getPriceOfETH() public view returns (int) {
        return int(price) / getCurrentPriceOfETH();
    }

    function payInETH() public payable returns (bool) {
        require(msg.value == uint(getPriceOfETH()), "Wrong amount of ETH");
        (bool sent /*data*/, ) = owner.call{value: msg.value}("");
        require(sent == true, "Failed to send ETH");
        alreadyBought[msg.sender] = true;
        return alreadyBought[msg.sender];
    }

    function changeOwner(address newOwner) public {
        require(msg.sender == owner, "Not Owner(changeOwner function)");
        owner = newOwner;
    }

    function changePrice(uint newPrice) public {
        require(msg.sender == owner, "Not Owner(changePrice function)");
        price = newPrice;
    }
}
