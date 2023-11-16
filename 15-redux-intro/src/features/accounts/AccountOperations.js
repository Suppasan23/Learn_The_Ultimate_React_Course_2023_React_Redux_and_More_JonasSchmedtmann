import { useState } from "react";
import { useDispatch } from "react-redux";
import { convertingCurrency, deposit, payLoan, requestLoan, withdraw } from "./accountSlice";
import { useSelector } from "react-redux";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const account = useSelector((state) => state.account);

  console.log(account.balance);
  console.log(account.loan);

  const dispatch = useDispatch();

  async function handleDeposit(e) {
    e.preventDefault();
    const realMoney = await convertMoney();
    if(!realMoney) return;
    dispatch(deposit(Number(realMoney)));
    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal(e) {
    e.preventDefault();
    if(!withdrawalAmount) return;
    dispatch(withdraw(Number(withdrawalAmount)));
    setWithdrawalAmount("");
  }

  function handleRequestLoan(e) {
    e.preventDefault();
    if(!loanAmount || !loanPurpose) return;
    dispatch(requestLoan({
      loanAmountSent: Number(loanAmount), 
      loanPurposeSent: loanPurpose
    }));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan(e) {
    e.preventDefault();
    if(account.balance < account.loan) return;
    dispatch(payLoan());
  }

  async function convertMoney(){
    if (currency === "USD") return depositAmount;

    try {
        dispatch(convertingCurrency(true))
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${depositAmount}&from=${currency}&to=USD`);
        const data = await res.json();
        const convertedAmount = data.rates.USD;

        console.log(convertedAmount);

        return convertedAmount;
    } catch (error) {
        console.error("Error converting currency:", error);
        // Handle the error accordingly, e.g., return an error value or throw an exception
        throw error;
    } finally {
      dispatch(convertingCurrency(false))
    }
  }

  return (
    <div>

      <h2>Your account operations</h2>

      <div className="inputs">

        {/* //Deposit///////////////////////////////////// */}
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={account.isLoading}> {account.isLoading ? "Converting..." : `Deposit ${depositAmount}` }</button>
        </div>

        {/* //Withdraw///////////////////////////////////// */}
        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>


        {/* //Request loan///////////////////////////////////// */}
        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>


        {/* //Pay back loan///////////////////////////////////// */}
        <div>
          <span>Pay back {account.loan} ({account.loanPurpose})</span>
          <button onClick={handlePayLoan}>Pay loan</button>
        </div>

      </div>

    </div>
  );
}

export default AccountOperations;