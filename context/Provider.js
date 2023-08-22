import { createContext, useContext, useEffect, useState } from "react";
import { Contract, Wallet } from "../utils";

export const Web3Context = createContext(null);

// Simple contract set-get-greeting
export const CONTRACT_ID = "dev-1692635127446-62744766911805";

function Web3Provider({ children }) {
  const [web3, setWeb3] = useState({
    wallet: null,
    contract: null,
    isSignedIn: null,
    message: null,
  });

  useEffect(() => {
    const loadProvider = async () => {
      const wallet = await new Wallet({
        createAccessKeyFor: CONTRACT_ID,
        network: "testnet",
      });
      const contract = await new Contract({
        contractId: CONTRACT_ID,
        wallet: wallet,
      });
      const isSignedIn = await wallet.startUp();
      const message = await contract.getGreeting();

      setWeb3({
        wallet,
        contract,
        isSignedIn,
        message,
      });
    };
    loadProvider();
  }, []);

  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
}

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
