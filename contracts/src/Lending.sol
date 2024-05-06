// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// import "./INFT.sol";
import { AssetFractionaliser} from "./AssetFractionaliser.sol";
import {AssetFactory} from "./AssetFactory.sol";
import  {SafeERC20}from "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";


/**
 * @title Fractionalizer - Fractionalizing Asset
 * @author @Mayowa Abikoye https://github.com/the-first-elder
 * @notice This contract is used for fractionizing Real World Asset.
 * @dev payment token here can be anything as there would be a swapper.
 */
contract LendingContract {
    using SafeERC20 for ERC20;
    using SafeERC20 for AssetFractionaliser;

    struct Loan {
        address borrower;
        uint256 amount;
        uint256 dueDate;
        uint unit;
        address fractonalizedToken;
    }

    enum TimePeriod {
        Days14,
        Days30,
        Days60,
        Days180
    }

    mapping (uint => Loan) public loanInfo;
    mapping(address => uint256[]) public debt;
    uint debtId;
    AssetFactory assetFactory;
    ERC20 paymentToken;
    

    constructor(address _assetFactory, address _paymentToken){
        assetFactory = AssetFactory(_assetFactory);
        paymentToken = ERC20(_paymentToken);
    }


    function borrow(address _fractionalizedToken, uint256 _unitToDeposit, uint256 _loanAmount, TimePeriod _time) external {
        // AssetFractionaliser memory info = AssetFractionaliser(_fractionalizedToken);
        require(assetFactory.isFractioned(_fractionalizedToken) == true, "token is not fractioned");
        require(AssetFractionaliser(_fractionalizedToken).balanceOf(msg.sender) >= _unitToDeposit, "you dont have units");
        require(AssetFractionaliser(_fractionalizedToken).getBasePrice() * _unitToDeposit == _loanAmount, "you cannot borrow more than you own");

        AssetFractionaliser(_fractionalizedToken).safeTransferFrom(msg.sender, address(this),  _unitToDeposit);

        Loan memory newLoan = Loan({
            borrower: msg.sender,
            amount: _loanAmount,
            dueDate: block.timestamp + getTimeInterpreter(_time), // Example due date
            unit: _unitToDeposit,
            fractonalizedToken: _fractionalizedToken
        });

        
        debt[msg.sender].push(debtId);
        loanInfo[debtId] = newLoan;
        paymentToken.safeTransfer(msg.sender, _loanAmount);
        debtId++;
    }

  
    function liquidate(uint256 _debtId) external {
        Loan storage loan = loanInfo[_debtId];
        require(block.timestamp >= loan.dueDate, "Debt not due");

        // Calculate 10% of the loan amount
uint loanAmount = loan.amount;
uint tenPercent = (loanAmount * 10) / 100;


    // Transfer tokens to contract to pay off debt
    paymentToken.safeTransferFrom(msg.sender, address(this), loan.amount + tenPercent);

    // Remove debt from borrower's list of debts
    uint256[] storage borrowerDebts = debt[msg.sender];
    for (uint256 i = 0; i < borrowerDebts.length; i++) {
        if (borrowerDebts[i] == _debtId) {
            delete borrowerDebts[i];
            break;
        }
    }

    // Transfer fractionalized token back to borrower
    AssetFractionaliser(loan.fractonalizedToken).safeTransfer(msg.sender, loan.unit);

    // Clean up loan data
    delete loanInfo[_debtId];
    }

    

    function paydebt(uint256 _debtId) external {
    Loan storage loan = loanInfo[_debtId];
    require(block.timestamp <= loan.dueDate, "Debt already due");

    // Transfer tokens to contract to pay off debt
    paymentToken.safeTransferFrom(msg.sender, address(this), loan.amount);

    // Remove debt from borrower's list of debts
    uint256[] storage borrowerDebts = debt[msg.sender];
    for (uint256 i = 0; i < borrowerDebts.length; i++) {
        if (borrowerDebts[i] == _debtId) {
            delete borrowerDebts[i];
            break;
        }
    }

    // Transfer fractionalized token back to borrower
    AssetFractionaliser(loan.fractonalizedToken).safeTransfer(msg.sender, loan.unit);

    // Clean up loan data
    delete loanInfo[_debtId];
}

  function getLoanInfo(uint num) public  view returns (Loan memory) {
        return loanInfo[num];
    }

  function getTimeInterpreter(TimePeriod _num) public pure returns (uint) {
        if (_num == TimePeriod.Days14) {
            return 14 days;
        } else if (_num == TimePeriod.Days30) {
            return 30 days;
        } else if (_num == TimePeriod.Days60) {
            return 60 days;
        } else if (_num == TimePeriod.Days180) {
            return 180 days;
        } else {
            // Handle invalid input
            revert("Invalid time period");
        }
    }


}
