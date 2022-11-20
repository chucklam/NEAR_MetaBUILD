import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { useWalletSelector } from "./contexts/WalletSelectorContext";

const App: React.FC = () => {
  const { selector, modal, accounts, accountId } = useWalletSelector();

  useEffect(() => {
    console.log('accountId', accountId);
    console.log('accounts', accounts);
  }, [accountId, accounts]);

  const handleSignIn = () => modal.show();

  const handleSignOut = async () => {
    const wallet = await selector.wallet();

    wallet.signOut().catch((err) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleSignIn}>Log in</button>
        <button onClick={handleSignOut}>Log out</button>
      </header>
    </div>
  );
}

export default App;
