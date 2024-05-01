// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/**
 * @title Fractionalizer
 * @author @developeruche,
 * @notice This is a contract for creating fractionalized real estate assets
 */
contract Fractionalizer is ERC20, ERC20Pausable, Ownable, ERC20Permit {
    struct MetaDataEx {
        // The description of the asset
        string description;
        // The URI of the asset
        string uri;
        // The hash of the metadata: just used for data intergrity
        bytes32 metadataHash;
    }

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


    // ===================================
    // CONSTRUCTOR
    // ===================================
// 
    constructor(
        address assetManager,
        string memory assetName,
        string memory assetSymbol,
        uint256 _assetPrice,
        address _paymentToken,
        string memory _description,
        string memory _uri
    ) ERC20(assetName, assetSymbol) Ownable(assetManager) ERC20Permit(assetName) {
        assetPrice = _assetPrice;
        paymentToken = _paymentToken;
        metadata = MetaDataEx({description: _description, uri: _uri, metadataHash: 0});
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
// todo
    function buyFraction(address to, uint256 amount, address payer) public onlyOwner {
        require(totalSupply() + amount <= maxSupply, "Fractionalizer: Asset sold out");
        handlePayment(payer);
        _mint(to, amount);
    }

    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
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
        IERC20(paymentToken).transferFrom(payer, address(this), assetPrice);
    }
}
