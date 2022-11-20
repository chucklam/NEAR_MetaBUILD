import { useEffect } from 'react';

import { useWalletSelector } from '../contexts/WalletSelectorContext';

const WalletConnect = () => {
  const { selector, modal, accounts, accountId } = useWalletSelector();

  useEffect(() => {
    console.log('accountId', accountId);
    console.log('accounts', accounts);
  }, [accountId, accounts]);

  const handleSignIn = () => modal.show();

  const handleSignOut = async () => {
    const wallet = await selector.wallet();

    wallet.signOut().catch((err) => {
      console.log('Failed to sign out');
      console.error(err);
    });
  };

  const handleVerifyOwner = async () => {
    const wallet = await selector.wallet();
    try {
      const owner = await wallet.verifyOwner({
        message: 'test message for verification',
      });

      if (owner) {
        alert(`Signature for verification: ${JSON.stringify(owner)}`);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      alert(message);
    }
  };

  return (
    <div>
      <h1>Connect to Wallet</h1>
      {accountId ?
        <>
          <h2>Hello {accountId}</h2>
          <button onClick={handleSignOut}>Log out</button>
          <button onClick={handleVerifyOwner}>Verify Owner</button>
        </>
        :
        <button onClick={handleSignIn}>Log in</button>
      }
    </div>
  );
};

export default WalletConnect;