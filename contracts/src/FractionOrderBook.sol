// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title FractionOrderBook
 * @author @developeruche,
 * @notice This is an order-book system for trading fractions of real estate assets
 */
contract FractionOrderBook {
    struct Order {
        // this the address of the owner of the order
        address owner;
        // this is the address of the asset
        address asset;
        // this is the amount of the asset
        uint256 amount;
        // this is the price of the asset
        uint256 price;
        // this is the address of the payment token
        address paymentToken;
        // this is the timestamp of the order
        bool isBuy;
        // this is the status of the order
        bool isFilled;
        // this is the status of the order
        bool isTerminated;
    }

    // this is a mapping fof the orders
    mapping(uint256 => Order) private orders;
    // this represents the order count
    uint256 private orderCount;

    event OrderCreated(
        address indexed owner,
        address indexed asset,
        uint256 amount,
        uint256 price,
        address paymentToken,
        bool isBuy,
        bool isFilled,
        bool isTerminated
    );

    /**
     * @notice This function creates an order
     * @param _asset The address of the asset
     * @param _amount The amount of the asset
     * @param _price The price of the asset
     * @param _paymentToken The address of the payment token
     * @param _isBuy The status of the order
     */
    function createOrder(address _asset, uint256 _amount, uint256 _price, address _paymentToken, bool _isBuy)
        external
    {
        Order memory order = Order({
            owner: msg.sender,
            asset: _asset,
            amount: _amount,
            price: _price,
            paymentToken: _paymentToken,
            isBuy: _isBuy,
            isFilled: false,
            isTerminated: false
        });

        orders[orderCount] = order;
        orderCount += 1;

        emit OrderCreated(
            order.owner,
            order.asset,
            order.amount,
            order.price,
            order.paymentToken,
            order.isBuy,
            order.isFilled,
            order.isTerminated
        );
    }

    /**
     * @notice This function fills an order
     * @param _orderId The id of the order
     */
    function fillOrder(uint256 _orderId) external {
        Order storage order = orders[_orderId];
        require(order.isFilled == false, "Order already filled");
        require(order.isTerminated == false, "Order already terminated");

        // transfer the asset to the buyer
        IERC20(order.asset).transferFrom(order.owner, msg.sender, order.amount);

        // transfer the payment token to the seller
        IERC20(order.paymentToken).transferFrom(msg.sender, order.owner, order.price);

        order.isFilled = true;
    }

    /**
     * @notice This function terminates an order
     * @param _orderId The id of the order
     */
    function terminateOrder(uint256 _orderId) external {
        Order storage order = orders[_orderId];
        require(order.isTerminated == false, "Order already terminated");

        order.isTerminated = true;
    }
    function getOrders() public view returns (Order[] memory) {
    uint256 _count = orderCount;
    Order[] memory result = new Order[](_count);
    for (uint256 i = 0; i < _count; i++) {
        result[i] = orders[i];
    }
    return result;
}
function getOrderCount() public view returns(uint256) {
    return orderCount;
}
}
