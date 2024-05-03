// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {AssetFractionaliser} from "./AssetFractionaliser.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

/**
 * @title AssetFactory - Verification of Asset
 * @author @Olamide Adetula https://github.com/lamsya
 * @notice This is a contract for creating fractionalized real estate assets
 */
contract AssetFactory is IERC721Receiver {
    address public immutable AssetNFT;

    // /this is a mapping of tokenId to the fractionalizers
    mapping(uint256 => address) public fractionalizers;
    mapping(uint256 => bool) public fractionalizerChekcer;

    event FractionalizerCreated(address fractionalizer, uint256 tokenId);

    constructor(address _assetnft) {
        AssetNFT = _assetnft;
    }

    function fractionalize(
        uint256 tokenId,
        string memory _assetName, // assetName
        string memory _assetSymbol, // asset symbol
        uint256 _assetPrice, //base price
        address _paymentToken, // payment token address
        string memory _description, // desctiption
        string memory _uri, // uri info with map
        uint256 _totalSupply,
        address _pool,
        address _owner
    ) external {
        require(fractionalizers[tokenId] == address(0), "FractionalizerFactory: fractionalizer already exists");
        require(
            address(this) == IERC721(AssetNFT).ownerOf(tokenId),
            "FractionalizerFactory: caller is not the owner of the token"
        );
        require(fractionalizerChekcer[tokenId] == false, "FractionlizerFactory: token already fractionized");
        AssetFractionaliser fractionalizer = new AssetFractionaliser(
            _assetName, _assetSymbol, _assetPrice, _paymentToken, _description, _uri, _totalSupply, _pool, _owner
        );

        fractionalizers[tokenId] = address(fractionalizer);
        fractionalizerChekcer[tokenId] = true;
        emit FractionalizerCreated(address(fractionalizer), tokenId);
    }

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data)
        external
        returns (bytes4)
    {
        return IERC721Receiver.onERC721Received.selector;
    }

    function balance(uint256 tokenId) public view returns (address) {
        return IERC721(AssetNFT).ownerOf(tokenId);
    }
}
