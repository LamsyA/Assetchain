// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import {AssetFractionaliser} from "./AssetFractionaliser.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721Receiver.sol";
import {AssetVerification} from "./AssetVerification.sol";

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
    mapping (address => bool) public isFractioned;
    event FractionalizerCreated(address fractionalizer, uint256 tokenId);

    constructor(address _assetnft) {
        AssetNFT = _assetnft;
    }

    function fractionalize(
        uint256 tokenId,
        address _paymentToken, // payment token address
        string memory _description, // desctiption
        string memory _symbol,
        uint256 _totalSupply,
        address _owner,
        address _pool
    ) external {
        require(fractionalizers[tokenId] == address(0), "FractionalizerFactory: fractionalizer already exists");
        require(
            address(this) == IERC721(AssetNFT).ownerOf(tokenId),
            "FractionalizerFactory: caller is not the owner of the token"
        );
        require(!fractionalizerChekcer[tokenId], "FractionlizerFactory: token already fractionized");

        // Fetch asset details from AssetVerification contract
        AssetVerification.Asset memory asset = AssetVerification(AssetNFT).getAsset(tokenId);

        AssetFractionaliser fractionalizer = new AssetFractionaliser(
            asset.name, _symbol, asset.value, _paymentToken, asset.description, asset.uri, _totalSupply, _pool, _owner
        );

        fractionalizers[tokenId] = address(fractionalizer);
        fractionalizerChekcer[tokenId] = true;
        isFractioned[address(fractionalizer)] = true;
        emit FractionalizerCreated(address(fractionalizer), tokenId);
    }

    function updateAssetValueAndPricee(uint256 tokenId, uint256 newValue, uint256 newPrice) public {
        require(tokenId > 0, "AssetFactory: Invalid tokenId");

        // Update asset value in AssetVerification contract
        AssetVerification(AssetNFT).updateAsset(tokenId, newValue);

        // Get the address of the associated AssetFractionaliser contract
        address fractionaliserAddress = fractionalizers[tokenId];
        require(fractionaliserAddress != address(0), "AssetFactory: Fractionaliser not found");

        // Call the updateAssetPrice function in the associated AssetFractionaliser contract
        AssetFractionaliser(fractionaliserAddress).updateAssetPrice(newPrice);
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

    function getAsset(uint256 tokenId) public view returns (AssetVerification.Asset memory) {
        return AssetVerification(AssetNFT).getAsset(tokenId);
    }
}
