// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {AssetVerification} from "../src/AssetVerification.sol";
import {AssetFactory} from "../src/AssetFactory.sol";
import {AssetFractionaliser} from "../src/AssetFractionaliser.sol";

contract AssetChainScript is Script {
    AssetVerification asset;
    AssetFactory assetFactory;
    AssetFractionaliser assetFractionaliser;

    address owner = 0x2a82addEEbf70F06e56EceF51Abd6b1927A0A39E;

    function run() public {
        vm.startBroadcast();
        asset = new AssetVerification();
        assetFactory = new AssetFactory(address(asset));

        vm.stopBroadcast();
    }
}
