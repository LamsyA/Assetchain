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
contract Fractionalizer is ERC20, ERC20Pausable, ERC20Permit {
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
        uint256 _totalSupply
    ) ERC20(assetName, assetSymbol) ERC20Permit(assetName) {
        assetPrice = _assetPrice;
        paymentToken = _paymentToken;
        metadata = MetaDataEx({description: _description, uri: _uri, metadataHash: 0});
        maxSupply = _totalSupply;
    }

    function pause() public {
        _pause();
    }

    function unpause() public {
        _unpause();
    }
    // todo

    function buyFraction(address to, uint256 amount) public {
        require(totalSupply() + amount <= maxSupply, "Fractionalizer: Asset sold out");
        handlePayment(msg.sender);
        _mint(to, amount);
    }

    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }

    function setPoolAddress(address _poolAddress) public {
        pool = _poolAddress;
    }

    // ===================================
    // INTERNAL FUNCTIONS
    // ===================================

    /**
     *
     * @dev this function is used to debit ERC20 token from a `payer`, the amount debitted is the current ticket price
     * @param payer this is the address paying for ticket
     */
    function handlePayment(address payer) internal {
        IERC20(paymentToken).safeTransferFrom(payer, pool, assetPrice);
    }

    // =======================================
    // VIEW FUNCTIONS
    // =======================================

    function getBasePrice() public view returns (uint256) {
        return assetPrice;
    }
}
