// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/utils/Counters.sol";
import "./Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

/**
 * @title AssetVerification - Verification of Asset
 * @author @Olamide Adetula https://github.com/lamsya
 * @notice This contract is used for verifying the originality and authenticity of a Real World Asset.
 */
contract AssetVerification is ERC721, ERC721URIStorage, ERC721Pausable, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;

    ////////////////////////////
    //////  ERROR   ///////////
    ///////////////////////////

    error AssetVerification__OnlyLegalTeamCanVerifyAssets();
    error AssetVerification__OnlyAuditorTeamCanVerifyAssets();
    error AssetVerification__AddressCanNotBeZero();

    //////////////////////////////
    //////  STATE VARIABLE  //////
    /////////////////////////////

    address public FractionalizerFactory;
    // Counter for token ID
    Counters.Counter private _TokenId;

    struct Asset {
        string name;
        uint256 value;
        address owner;
        bool verify;
        uint256 tokenid;
        string uri;
    }

    mapping(uint256 => Asset) public assetList;
    mapping(address => address) public legalTeam;
    mapping(address => address) public audtiorTeam;

    event AssetUpdated(uint256 indexed value, address indexed owner);
    event AssetCreated(address indexed owner, uint256 indexed tokenId, string uri);

    constructor() ERC721("REAL WORLD ASSET", "PWD") Ownable(msg.sender) {}

    modifier onlyLegalTeam() {
        if (legalTeam[msg.sender] == address(0)) {
            revert AssetVerification__OnlyLegalTeamCanVerifyAssets();
        }
        _;
    }

    modifier onlyAuditorTeam() {
        if (audtiorTeam[msg.sender] == address(0)) {
            revert AssetVerification__OnlyAuditorTeamCanVerifyAssets();
        }
        _;
    }

    modifier canNotBeZeroAddress(address _address) {
        if (_address == address(0)) {
            revert AssetVerification__AddressCanNotBeZero();
        }
        _;
    }

    function addLegalTeam(address _legalTeam) public onlyOwner {
        // Add the provided address to the legal team
        legalTeam[_legalTeam] = _legalTeam;
    }

    function addAuditorTeam(address _auditorTeam) public onlyOwner {
        // Add the provided address to the auditor team
        audtiorTeam[_auditorTeam] = _auditorTeam;
    }

    function createAsset(address _owner, string memory _assetName, string memory _assertUri)
        public
        onlyLegalTeam
        canNotBeZeroAddress(_owner)
        returns (bool)
    {
        if (FractionalizerFactory == address(0)) {
            revert AssetVerification__AddressCanNotBeZero();
        }
        // Increment token ID
        _TokenId.increment();

        // Get the current token ID
        uint256 tokenId = _TokenId.current();

        // Create the asset with provided details
        Asset storage newAsset = assetList[tokenId];
        newAsset.name = _assetName;
        newAsset.value;
        newAsset.owner = FractionalizerFactory;
        newAsset.verify = true;
        newAsset.tokenid = tokenId;
        newAsset.uri = _assertUri;

        _safeMint(FractionalizerFactory, tokenId);
        _setTokenURI(tokenId, newAsset.uri);

        // Emit an event to indicate that the asset has been created

        emit AssetCreated(newAsset.owner, tokenId, newAsset.uri);
        return true;
    }

    function updateAsset(uint256 _tokenId, uint256 _value) public onlyAuditorTeam returns (bool) {
        // Update the asset with provided details
        Asset storage asset = assetList[_tokenId];
        asset.value = _value;
        // Emit an event to indicate that the asset has been verified
        emit AssetUpdated(asset.value, asset.owner);
        return true;
    }

    function setFactoryContractaddress(address _factoryContract) public canNotBeZeroAddress(_factoryContract) {
        FractionalizerFactory = _factoryContract;
    }

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

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
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
