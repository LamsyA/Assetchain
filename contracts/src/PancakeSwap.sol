// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;

interface IPancakeRouter {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

      function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}



/**
 * @title Fractionalizer - Fractionalizing Asset
 * @author @Mayowa Abikoye https://github.com/the-first-elder
 * @notice This contract is used for fractionizing Real World Asset.
 * @dev swapper contract on bnb chain using pancakeswap
 */
 
contract TokenSwap {
    IPancakeRouter public pancakeRouter;
    address public WBNBAddress; 
    constructor(address _pancakeRouter, address _WBNBAddress) {
        pancakeRouter = IPancakeRouter(_pancakeRouter);
        WBNBAddress = _WBNBAddress;
    }

// address pancake : 0x10ED43C718714eb63d5aA57B78B54704E256024E
// wbnb : 0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c

    function swapTokens(
        uint amountIn,
        uint amountOutMin,
        address[] memory path,
        address to,
        uint deadline
    ) external returns( uint[] memory amounts)  {
       amounts =  pancakeRouter.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
        );
    }

     function swapTokensToBNB(
        uint amountIn,
        uint amountOutMin,
        address[] memory path,
        address to,
        uint deadline
    ) external {
        pancakeRouter.swapExactTokensForETH(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
        );
    }
}
