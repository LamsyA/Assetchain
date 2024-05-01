// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

/**
 * @title COFO -> Cerificate of Ownership contract
 * @author @developeruche
 * @notice This is contract serve are proof of owner of a real estate property. [Owner of any ID of this token owns the respective Real estate asset]
 */
contract COFO is ERC721, ERC721URIStorage, ERC721Pausable, Ownable, ERC721Burnable {
    struct MetaData {
        // This is the hash of the meta-data storged on chain this is used for data intergrity
        bytes32 metadataHash;
        // this is the name of the asset
        string name;
        // this is the symbol of the asset
        string symbol;
        // The description of the asset
        string description;
        // The URI of the asset
        string uri;
    }

    // this mapping maps tokenId to it coresponing metadata
    mapping(uint256 => MetaData) public metadata;

    constructor(address manager) ERC721("Cerificate Of Ownership", "COFO") Ownable(manager) {}

    /**
     * @notice this function is used to pause the operations of the cert
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @notice this is the function is used to unpause this certficate
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     *
     * @param to this is the address receiving this NFT
     * @param tokenId this is the token id of this NFT
     * @param meta this is the metadata of the real estate salary
     * @notice this function is used by the manager to issue new certificates
     */
    function issueCertificate(address to, uint256 tokenId, MetaData memory meta) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, meta.uri);
        _setMetadata(tokenId, meta);
    }

    // =================================
    // Internal Functions
    // =================================

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _setMetadata(uint256 tokenId, MetaData memory meta) internal {
        require(metadata[tokenId].metadataHash == bytes32(0), "Metadata alreadt set");
        metadata[tokenId] = meta;
    }

    // =============================
    // View Functions
    // =============================

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
