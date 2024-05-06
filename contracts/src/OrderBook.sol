// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {AssetFractionaliser} from "./AssetFractionaliser.sol";

/**
 * @title AssetFractionaliser - Fractionalizing Asset
 * @author @Mayowa Abikoye https://github.com/the-first-elder
 * @notice This contract is used for Buying and Selling RWA
 */
contract OrderBook {
    struct Order {
        address fractionalizer;
        address user;
        uint256 unit;
        uint256 price;
        bool canSell;
    }

    struct OrderBooks {
        address fractionalizer;
        address owner;
        uint256 unitToBeSold;
        uint256 priceForAllUnits;
        bool canSell;
    }

    using SafeERC20 for ERC20;
    using SafeERC20 for AssetFractionaliser;

    ERC20 public token;
    uint256 public basePrice;
    uint256 public orderIdCounter;
    address paymentToken;
    address[] public allSellersInfo;

    mapping(address => Order) public orders;
    mapping(uint256 => OrderBooks) public orderBookFullInfo;

    event OrderPlaced(uint256 orderId, address indexed user, uint256 amount, uint256 price, bool canSell);
    event OrderTerminated(address user);
    event BasePriceUpdated(uint256 newBasePrice);
    event Bought(address buyer, address seller, uint256 unit, uint256 price);

    constructor(address _paymentToken) {
        paymentToken = _paymentToken;
    }

    function listAsset(AssetFractionaliser _token, uint256 unitToSell, uint256 price, bool _isSell) public {
        require(unitToSell > 0, "unit must be greater than 0");
        require(price * unitToSell >= _token.getBasePrice() * unitToSell, "Price must be greater than base Price");

        require(token.balanceOf(msg.sender) >= unitToSell, "Insufficient token balance");
        _token.safeTransferFrom(msg.sender, address(this), price);

        orders[msg.sender] = Order(address(token), msg.sender, unitToSell, price, _isSell);
        allSellersInfo.push(msg.sender);
        emit OrderPlaced(orderIdCounter, msg.sender, unitToSell, price, _isSell);
        orderIdCounter++;
    }

    function placeOrderToBuy(AssetFractionaliser _token, address seller, uint256 price, uint256 unit) public {
        Order memory information = orders[seller];
        require(information.canSell == true, "buyer not selling");
        require(information.price / unit <= price, "price is lower than expected");
        information.unit -= unit;
        orders[seller] = information;
        if (information.unit == 0) {
            delete orders[seller];
        }
        _token.safeTransfer(msg.sender, unit);
        sendPaymentToSeller(msg.sender, seller, price);
        emit Bought(msg.sender, seller, unit, price);
    }

    function sendPaymentToSeller(address buyer, address seller, uint256 price) internal {
        ERC20(paymentToken).safeTransferFrom(buyer, seller, price);
    }

    function terminateOrder(AssetFractionaliser _token) public {
        require(orders[msg.sender].user != address(0), "Order does not exist");
        Order memory information = orders[msg.sender];

        _token.safeTransfer(msg.sender, information.unit);

        delete orders[msg.sender];
        orderIdCounter--;
        emit OrderTerminated(msg.sender);
    }

    function getAllOrders() public view returns (Order[] memory) {
        uint256 count = orderIdCounter;
        Order[] memory result = new Order[](count);
        for (uint256 i = 0; i < allSellersInfo.length; i++) {
            address user = allSellersInfo[i];
            if (orders[user].unit == 0) {} else {
                result[i] = orders[user];
            }
        }
        return result;
    }

    function getNumberOfOrders() public view returns (uint256) {
        return orderIdCounter;
    }
}
