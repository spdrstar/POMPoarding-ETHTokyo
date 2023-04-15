import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';
import { CommunityContext } from '../lib/CommunityContext';
import Loading from '../components/loading';
import { Magic } from 'magic-sdk';
import { ethers } from 'ethers';
import Safe, { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit'


const handleSubmit = async (e) => {
    e.preventDefault();
    const objectToInsert = { name, email };
    const response = await fetch('/api/addObject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(objectToInsert),
    });
    const data = await response.json();
    console.log(data);
  };

// Use Quicknode RPC
// const customNodeOptions = {
//     rpcUrl: 'https://rpc.sepolia.org', // Your own node URL
//     chainId: 11155111, // Your own node's chainId
// };

const Dashboard = () => {
  const [user] = useContext(UserContext);
  const [community] = useContext(CommunityContext);

  // Store the data
  useEffect(() => {
    const storeCommunity = async () => {
      const communityObject = { user, community };
      const response = await fetch('/api/storeCommunity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(communityObject),
      });
      const data = await response.json();
      console.log(data);
    };

    // Call the asynchronous function
    storeCommunity();
  }, []);

//   useEffect(() => {
//     // Define an asynchronous function inside the useEffect hook
//     const createSafe = async () => {
//       // If user is loaded in, create a Safe
//       if (user?.issuer) {
//         // Connect to Magic
//         const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
  
//         // Connect to wallet provider and signer with Ethers
//         const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
//         const signerWallet = provider.getSigner(); //2
//         const ethAdapter = new EthersAdapter({
//           ethers,
//           signerOrProvider: signerWallet,
//         }); //3
  
//         // Use Safe to create a Safe
//         const safeFactory = await SafeFactory.create({ ethAdapter }); //4
//         const safeSdk = await safeFactory.deploySafe({
//           safeAccountConfig: { threshold: 1, owners: [await signerWallet.getAddress()] },
//         }); //5
//         console.log(safeSdk);
//       }
//     };
  
//     // Call the asynchronous function
//     createSafe();
//   }, [user]);
  
  console.log(user)
  console.log(community)

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

          </>
        )
    )}
    </>
  )
};

export default Dashboard;
