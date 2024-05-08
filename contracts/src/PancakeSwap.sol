// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IPancakeRouter {
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactTokensForETH(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
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

    function swapTokens(uint256 amountIn, uint256 amountOutMin, address[] memory path, address to, uint256 deadline)
        external
        returns (uint256[] memory amounts)
    {
        amounts = pancakeRouter.swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline);
    }

    function swapTokensToBNB(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] memory path,
        address to,
        uint256 deadline
    ) external {
        pancakeRouter.swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline);
    }
}
