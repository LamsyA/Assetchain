// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title Fractionalizer - Fractionalizing Asset
 * @author @Mayowa Abikoye https://github.com/the-first-elder
 * @notice This contract is used for fractionizing Real World Asset.
 */
contract AssetFractionaliser is ERC20, ERC20Pausable, ERC20Permit, Ownable {
    // ==================
    // ERROR
    // =================

    error AssetFractionaliser__AmountCannotBeZero();

    struct MetaDataEx {
        // The description of the asset
        string description;
        // The URI of the asset
        string uri;
        // The hash of the metadata: just used for data intergrity
        bytes32 metadataHash;
    }

    using SafeERC20 for IERC20;
    // ===================================
    // STATE VARIABLES
    // ===================================

    // This is the price of uint the asset
    uint256 public assetPrice;
    // Erc20 token address
    address public paymentToken;
    // The metadata of the asset
    MetaDataEx public metadata;
    // Max supply
    uint256 maxSupply;
    // Pool Address
    address pool;

    // =================================
    // EVENTS
    // =================================
    event BuyFractionalized(address indexed from, address indexed to, uint256 amount);

    // ===================================
    // CONSTRUCTOR
    // ===================================
    //
    constructor(
        string memory assetName, // assetName
        string memory assetSymbol, // asset symbol
        uint256 _assetPrice, //base price
        address _paymentToken, // payment token address
        string memory _description, // desctiption
        string memory _uri, // uri info with map
        uint256 _totalSupply,
        address _pool,
        address _owner
    ) ERC20(assetName, assetSymbol) ERC20Permit(assetName) Ownable(_owner) {
        assetPrice = _assetPrice;
        paymentToken = _paymentToken;
        metadata = MetaDataEx({description: _description, uri: _uri, metadataHash: 0});
        maxSupply = _totalSupply;
        pool = _pool;
    }

    function pause() public {
        _pause();
    }

    function unpause() public {
        _unpause();
    }

    function buyFraction(address _to, uint256 amount) public {
        require(totalSupply() + amount <= maxSupply, "Fractionalizer: Asset sold out");
        if (amount == 0) {
            revert AssetFractionaliser__AmountCannotBeZero();
        }
        uint256 amountToPay = (amount * assetPrice);
        IERC20(paymentToken).safeTransferFrom(msg.sender, pool, amountToPay);
        emit BuyFractionalized(msg.sender, pool, assetPrice);
        _mint(_to, amount);
    }

    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }

    function updateAssetPrice(uint256 newPrice) public onlyOwner {
        assetPrice = newPrice;
    }

    function setPoolAddress(address _poolAddress) public onlyOwner {
        pool = _poolAddress;
    }

    // =======================================
    // VIEW FUNCTIONS
    // =======================================

    function getBasePrice() public view returns (uint256) {
        return assetPrice;
    }
}
