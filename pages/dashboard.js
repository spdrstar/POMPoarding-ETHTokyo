import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';
import { CommunityContext } from '../lib/CommunityContext';
import Loading from '../components/loading';
import { Magic } from 'magic-sdk';
import { ethers } from 'ethers';
import Safe, { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit'
import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { StyledBadge } from "../components/table/styledbadge";
import { IconButton } from "../components/table/iconbutton";
import { EyeIcon } from "../components/table/eyeicon";
import { DeleteIcon } from "../components/table/deleteicon";

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

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  var users = [];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
            {user.email}
          </User>
        );
      case "role":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        );
      case "status":
        return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Approve">
                <IconButton onClick={() => console.log("View user", user.id)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Remove"
                color="error"
                onClick={() => console.log("Delete user", user.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

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

  if(community) {
    const owner = {
        id: 1,
        name: community.firstname + " " + community.lastname,
        email: user.email,
        status: "active",
    }
    users.push(owner);
    if(community.owner2) {
        users.push({id:2, name: "", email: community.owner2, status: "unconfirmed"})
    }
    if(community.owner3) {
        users.push({id:3, name: "", email: community.owner3, status: "unconfirmed"})
    }
    if(community.owner4) {
        users.push({id:4, name: "", email: community.owner4, status: "unconfirmed"})
    }
  }

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

            <Table
                aria-label="Community Leaders"
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}
                selectionMode="none"
                >
                <Table.Header columns={columns}>
                    {(column) => (
                    <Table.Column
                        key={column.uid}
                        hideHeader={column.uid === "actions"}
                        align={column.uid === "actions" ? "center" : "start"}
                    >
                        {column.name}
                    </Table.Column>
                    )}
                </Table.Header>
                <Table.Body items={users}>
                    {(item) => (
                    <Table.Row>
                        {(columnKey) => (
                        <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                        )}
                    </Table.Row>
                    )}
                </Table.Body>
            </Table>
          </>
        )
    )}
    </>
  )
};

export default Dashboard;
