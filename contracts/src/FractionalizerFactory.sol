// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


import {Fractionalizer} from "./Fractionalizer.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";




/**
 * @title FractionalizerFactory
 * @author @developeruche,
 * @notice This is a factory contract for creating Fractionalizer contracts
 */
contract FractionalizerFactory {
    // this is the address of the COFO contract
    address immutable public cofo;
    // this is a mapping of tokenId to the fractionalizers
    mapping(uint256 => address) public fractionalizers;
    mapping(uint => bool) public fractionalizerChekcer;
    event FractionalizerCreated(address fractionalizer, uint256 tokenId);

    constructor(address _cofo) {
        cofo = _cofo;
    }




    function fractionalize(
        uint256 tokenId,
        address assetManager,
        string memory assetName,
        string memory assetSymbol,
        uint256 _assetPrice,
        address _paymentToken,
        string memory _description,
        string memory _uri
    ) external {
        require(fractionalizers[tokenId] == address(0), "FractionalizerFactory: fractionalizer already exists");
        require(msg.sender == IERC721(cofo).ownerOf(tokenId), "FractionalizerFactory: caller is not the owner of the token");
        require(fractionalizerChekcer[tokenId]== false, "FractionlizerFactory: token already fractionized");
        Fractionalizer fractionalizer = new Fractionalizer(
            assetManager,
            assetName,
            assetSymbol,
            _assetPrice,
            _paymentToken,
            _description,
            _uri
        );

        fractionalizers[tokenId] = address(fractionalizer);
        fractionalizerChekcer[tokenId] = true;
        emit FractionalizerCreated(address(fractionalizer), tokenId);
    }
}
