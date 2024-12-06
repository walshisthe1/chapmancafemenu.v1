import { useConnection, useWallet } from '@solana/wallet-adapter-react';

function YourComponent() {
  const { connection } = useConnection();
  const { wallet } = useWallet();

  const handleSolanaOperation = async () => {
    try {
      // Your Solana operations here
      await connection.someOperation();
    } catch (error) {
      console.error('Solana operation failed:', error);
      // Handle error appropriately
    }
  };

  return (
    <div>
      <button onClick={handleSolanaOperation}>
        Perform Solana Operation
      </button>
    </div>
  );
}