// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {AssetVerification} from "../src/AssetVerification.sol";
import {AssetFactory} from "../src/AssetFactory.sol";
import {AssetFractionaliser} from "../src/AssetFractionaliser.sol";
import {OrderBook} from "../src/OrderBook.sol";
import {TokenSwap} from "../src/PancakeSwap.sol";
import {TestToken} from "../src/Mock/MockERC20.sol";
import {LendingContract} from "../src/Lending.sol";

contract AssetChainScript is Script {
    AssetVerification asset;
    AssetFactory assetFactory;
    AssetFractionaliser assetFractionaliser;
    OrderBook orderBook;
    TokenSwap pancakeSwap;
    TestToken testToken;
    LendingContract lendingContract;
    address owner = 0x4131811b8a4237712905650985A7474F8f92b18b;
    address pancakeRouter = 0x10ED43C718714eb63d5aA57B78B54704E256024E;
    address wbnb = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;

    function run() public {
        vm.startBroadcast();
        // vm.prank(owner);
        testToken = new TestToken(owner);
        testToken.mint(owner, 10_000 ether);
        asset = new AssetVerification();
        asset.addAuditorTeam(owner);
        asset.addLegalTeam(owner);
        assetFactory = new AssetFactory(address(asset));
        asset.setFactoryContractaddress((address(assetFactory)));
        orderBook = new OrderBook(address(testToken));
        pancakeSwap = new TokenSwap(pancakeRouter, wbnb);
        lendingContract = new LendingContract(address(assetFactory), address(testToken));
        // line 1
        vm.stopBroadcast();
    }
}
