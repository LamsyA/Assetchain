// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Fractionalizer} from "./Fractionalize.sol";

/**
 * @title Fractionalizer - Fractionalizing Asset
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
    using SafeERC20 for Fractionalizer;

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

    function listAsset(Fractionalizer _token, uint256 unitToSell, uint256 price, bool _isSell) public {
        require(unitToSell > 0, "unit must be greater than 0");
        require(price * unitToSell >= _token.getBasePrice() * unitToSell, "Price must be greater than base Price");

        require(token.balanceOf(msg.sender) >= unitToSell, "Insufficient token balance");
        _token.safeTransferFrom(msg.sender, address(this), price);

        orders[msg.sender] = Order(address(token), msg.sender, unitToSell, price, _isSell);
        allSellersInfo.push(msg.sender);
        emit OrderPlaced(orderIdCounter, msg.sender, unitToSell, price, _isSell);
        orderIdCounter++;
    }

    function placeOrderToBuy(Fractionalizer _token, address seller, uint256 price, uint256 unit) public {
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

    function terminateOrder(Fractionalizer _token) public {
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
// function executeOrder(uint256 buyOrderId, uint256 sellOrderId) public {
//     Order storage buyOrder = orders[buyOrderId];
//     Order storage sellOrder = orders[sellOrderId];

//     require(buyOrder.canSell, "Buy order ID is invalid");
//     require(!sellOrder.isBuyOrder, "Sell order ID is invalid");
//     require(buyOrder.price >= sellOrder.price, "Buy order price must be equal or higher than sell order price");

//     uint256 amountToTransfer = buyOrder.amount < sellOrder.amount ? buyOrder.amount : sellOrder.amount;

//     if (buyOrder.isBuyOrder) {
//         token.transferFrom(buyOrder.user, address(this), amountToTransfer);
//     } else {
//         token.transfer(sellOrder.user, amountToTransfer);
//     }

//     if (sellOrder.price > basePrice) {
//         basePrice = sellOrder.price;
//         emit BasePriceUpdated(basePrice);
//     }

//     delete orders[buyOrderId];
//     delete orders[sellOrderId];
// }
// }
