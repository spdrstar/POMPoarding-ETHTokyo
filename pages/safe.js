import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';
import Loading from '../components/loading';
import { Magic } from 'magic-sdk';
import { ethers } from 'ethers';
import Safe, { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit'

// Use Quicknode RPC
// const customNodeOptions = {
//     rpcUrl: 'https://rpc.sepolia.org', // Your own node URL
//     chainId: 11155111, // Your own node's chainId
// };

const SafePart = () => {
  const [user] = useContext(UserContext);

  useEffect(() => {
    // Define an asynchronous function inside the useEffect hook
    const createSafe = async () => {
      // If user is loaded in, create a Safe
      if (user?.issuer) {
        // Connect to Magic
        const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
  
        // Connect to wallet provider and signer with Ethers
        const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        const signerWallet = provider.getSigner(); //2
        const ethAdapter = new EthersAdapter({
          ethers,
          signerOrProvider: signerWallet,
        }); //3
  
        // Use Safe to create a Safe
        const safeFactory = await SafeFactory.create({ ethAdapter }); //4
        const safeSdk = await safeFactory.deploySafe({
          safeAccountConfig: { threshold: 1, owners: [await signerWallet.getAddress()] },
        }); //5
        console.log(safeSdk);
      }
    };
  
    // Call the asynchronous function
    createSafe();
  }, [user]);
  

  return (
    <>
    {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <>
            <div className='label'>Email</div>
            <div className='profile-info'>{user.email}</div>

            <div className='label'>User Id</div>
            <div className='profile-info'>{user.issuer}</div>

            <div className='label'>User Address</div>
            <div className='profile-info'>{user.publicAddress}</div>

            <div className='label'>User Balance</div>
            <div className='profile-info'>{user.balance}</div>
          </>
        )
    )}
    </>
  )
};

export default SafePart;
