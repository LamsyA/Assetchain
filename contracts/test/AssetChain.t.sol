// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {AssetChainScript} from "../script/AssetChain.s.sol";
import {COFO} from "../src/COFO.sol";

contract AssetChainTest is Test {
    COFO public deployedCofo;
    address public owner = makeAddr("owner");

    function setUp() public {
        deployedCofo = new COFO(owner);
    }

    function testOwner() public {
        console.log("onwer: ", deployedCofo.owner());
        assertEq(deployedCofo.owner(), owner);
    }
}
