import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import "dotenv/config";
import { fromBase64 } from "@mysten/sui/utils";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import path from 'path';
import { log } from "console";

type Network = 'mainnet' | 'testnet' | 'devnet' | 'localnet';
const ACTIVE_NETWORK = (process.env.NETWORK as Network) || 'testnet';
const SUI_BIN = `sui`;
const private_key = process.env.PRIVATE_KEY;
if (!private_key) {
    throw new Error("Private key is not defined");
}
const active_address = process.env.ACTIVE_ADDRESS;
if (!active_address) {
    throw new Error("Active address is not defined");
}
const client = new SuiClient({ url: getFullnodeUrl("testnet") });
// const packageObjectId = '0x43860f440c786675a0472bdc9a5375dc60ab0c4e1d6b5798a0834eaa516f83c8';
const packageObjectId = process.env.PACKAGE_ID;
if (!packageObjectId) {
    throw new Error("Package Id is not defined");
}

// const keypair = Ed25519Keypair.fromSecretKey(fromBase64(private_key).slice(1));


const getActiveAddress = () => {
    return execSync(`${SUI_BIN} client active-address`, { encoding: 'utf8' }).trim();
};

const getSigner = () => {
    const sender = getActiveAddress();
    const keystore = JSON.parse(
        readFileSync(path.join(homedir(), '.sui', 'sui_config', 'sui.keystore'), 'utf8'),
    );

    for (const priv of keystore) {
        const raw = fromBase64(priv);
        if (raw[0] !== 0) {
            continue;
        }

        const pair = Ed25519Keypair.fromSecretKey(raw.slice(1));
        if (pair.getPublicKey().toSuiAddress() === sender) {
            return pair;
        }
    }

    throw new Error(`Keypair not found for sender: ${sender}`);
};

const getClient = (network: Network) => {
    return new SuiClient({ url: getFullnodeUrl(network) });
};

const signAndExecute = async (txb: Transaction, network: Network) => {
    const client = getClient(network);
    const signer = getSigner();

    try {
        return await client.signAndExecuteTransaction({
            transaction: txb,
            signer,
            options: {
                showEffects: true,
                showObjectChanges: true,
            },
        });
    } catch (error) {
        console.error('Transaction failed:', error);
    }
};

export const createUser = async (userEmail: string, packageObjectId: string) => {
    const tx = new Transaction();
    tx.moveCall({
        target: `${packageObjectId}::bondex::register_user`,
        arguments: [
            tx.pure.string(userEmail), // Pass the email as a string
        ],
    });
    const users = await client.getOwnedObjects({
        owner: active_address,
        filter: { StructType: `${packageObjectId}::bondex::User` },
    })
    console.log('List of Users', users.data );

    const user = users.data[users.data.length-1];
    log('User:', user);
    tx.setGasBudget(1000000000); // Set the gas budget
    console.log("Transaction Block:", tx);
    const result = await signAndExecute(tx, ACTIVE_NETWORK);
    if (result) {
        console.log('Transaction Result:', result);
    }
    return result;
}
// console.log(createUser("gloria@gmail", packageObjectId));

export const getUsers = async (packageObjectId: string) => {
    const users = await client.getOwnedObjects({
        owner: '0xc3818f0168451aa6a37d43168120889d06cd8df536ca7f4710d546b1fe06cd17',
        filter: { StructType: `${packageObjectId}::bondex::User` },
    })
    console.log('List of Users', users.data );
    return users;
}
// console.log(getUsers(packageObjectId));

export const createCommunityPool = async (name: string, creator: string, goal_amount: number, distribution_policy: string, amount_per_cycle: number) => {
    const tx = new Transaction();
    tx.moveCall({
        target: `${packageObjectId}::bondex::create_community_pool`,
        arguments: [
            tx.pure.string(name), // Pass the email as a string
            tx.pure.address(creator), // Pass the email as a string
            tx.pure.u64(goal_amount), // Pass the email as a string
            tx.pure.string(distribution_policy), // Pass the email as a string
            tx.pure.u64(amount_per_cycle), // Pass the email as a string
        ],
    });
    tx.setGasBudget(1000000000); // Set the gas budget
    console.log("Transaction Block:", tx);
    const result = await signAndExecute(tx, ACTIVE_NETWORK);
    if (result) {
        console.log('Transaction Result:', result);
    }
    return result;
}
// console.log('Community Pool' ,createCommunityPool("House fund", "0xaa321dd27399fe3867acde1ccfcd0e149d0a9db355e4fae36e94109c7d6772d0", 100000, "Even", 1000));


export const getCommunityPools = async (packageObjectId: string) => {
    const communityPools = await client.getOwnedObjects({
        owner: '0xc3818f0168451aa6a37d43168120889d06cd8df536ca7f4710d546b1fe06cd17',
        filter: { StructType: `${packageObjectId}::bondex::CommunityPool` },
    });
    console.log('List of Community Pools', communityPools.data );
    return communityPools;
}
// console.log(getCommunityPools(packageObjectId));


export const createRotationalSavings = async (name: string, creator: string, rotation_period_in_days: number, contribution_amount_per_cycle: number, total_cycles: number, asset_value: number) => {
    const tx = new Transaction();
    tx.moveCall({
        target: `${packageObjectId}::bondex::create_rotation_savings`,
        arguments: [
            tx.pure.string(name), // Pass the email as a string
            tx.pure.address(creator), // Pass the email as a string
            tx.pure.u64(rotation_period_in_days), // Pass the email as a string
            tx.pure.u64(contribution_amount_per_cycle), // Pass the email as a string
            tx.pure.u64(total_cycles), // Pass the email as a string
            tx.pure.u64(asset_value), // Pass the email as a string
        ],
    });
    tx.setGasBudget(1000000000); // Set the gas budget
    console.log("Transaction Block:", tx);
    const result = await signAndExecute(tx, ACTIVE_NETWORK);
    if (result) {
        console.log('Transaction Result:', result);
    }
    return result;
    
}
// console.log(createRotationalSavings("House fund", "0xaa321dd27399fe3867acde1ccfcd0e149d0a9db355e4fae36e94109c7d6772d0", 30, 1000, 12, 100000));


export const getRotationalSavings = async (packageObjectId: string) => {
    const communityPools = await client.getOwnedObjects({
        owner: '0xc3818f0168451aa6a37d43168120889d06cd8df536ca7f4710d546b1fe06cd17',
        filter: { StructType: `${packageObjectId}::bondex::RotationalSavings` },
    });
    console.log('List of Rotational Savings', communityPools.data );
    return communityPools;
}
// console.log(getRotationalSavings(packageObjectId));

export const createLeaderboardSavings = async (name: string, creator: string,  reward_threshold: number, rewards_pool: number, reward_policy: string) => {
    const tx = new Transaction();
    tx.moveCall({
        target: `${packageObjectId}::bondex::create_leaderboard_savings`,
        arguments: [
            tx.pure.string(name), // Pass the email as a string
            tx.pure.address(creator), // Pass the email as a string
            tx.pure.u64(reward_threshold), // Pass the email as a string
            tx.pure.u64(rewards_pool), // Pass the email as a string
            tx.pure.string(reward_policy), // Pass the email as a string
        ],
    });
    tx.setGasBudget(1000000000); // Set the gas budget
    console.log("Transaction Block:", tx);
    const result = await signAndExecute(tx, ACTIVE_NETWORK);
    if (result) {
        console.log('Transaction Result:', result);
    }
    return result;
}
// console.log(createLeaderboardSavings("House fund", "0xaa321dd27399fe3867acde1ccfcd0e149d0a9db355e4fae36e94109c7d6772d0", 1000, 100000, "Even"));

export const getLeaderboardSavings = async (packageObjectId: string) => {
    const communityPools = await client.getOwnedObjects({
        owner: '0xc3818f0168451aa6a37d43168120889d06cd8df536ca7f4710d546b1fe06cd17',
        filter: { StructType: `${packageObjectId}::bondex::LeaderboardSavings` },
    });
    console.log('List of Leaderboard Savings', communityPools.data );
    return communityPools;
}
console.log(getLeaderboardSavings(packageObjectId));









// (async () => {
//     type Network = 'mainnet' | 'testnet' | 'devnet' | 'localnet';
//     const ACTIVE_NETWORK = (process.env.NETWORK as Network) || 'testnet';
//     const SUI_BIN = `sui`;
//     const private_key = process.env.PRIVATE_KEY;
//     if (!private_key) {
//         console.log("Please provide a private key");
//         process.exit(1);
//     }

//     const keypair = Ed25519Keypair.fromSecretKey(fromBase64(private_key).slice(1));
//     const client = new SuiClient({ url: getFullnodeUrl("testnet") });

//     const packageObjectId = '0x43860f440c786675a0472bdc9a5375dc60ab0c4e1d6b5798a0834eaa516f83c8';
//     const userEmail = 'example@domain.com'; 
//     const packageInfo = await client.getObject({ id: packageObjectId });
//     console.log({ packageInfo });
    
//     const tx = new Transaction();
//     tx.moveCall({
//         target: `${packageObjectId}::bondex::register_user`,
//         arguments: [
//             tx.pure.string(userEmail), // Pass the email as a string
//         ],
//     });
//     const users = await client.getOwnedObjects({
//         owner: '0xc3818f0168451aa6a37d43168120889d06cd8df536ca7f4710d546b1fe06cd17',
//         filter: { StructType: `${packageObjectId}::bondex::User` },
//     })
//     console.log('List of Users', users.data );

//     const user = users.data[users.data.length-1];
//     log('User:', user);





//     tx.setGasBudget(1000000000); // Set the gas budget
//     console.log("Transaction Block:", tx);

//     const getActiveAddress = () => {
//         return execSync(`${SUI_BIN} client active-address`, { encoding: 'utf8' }).trim();
//     };

//     const getSigner = () => {
//         const sender = getActiveAddress();
//         const keystore = JSON.parse(
//             readFileSync(path.join(homedir(), '.sui', 'sui_config', 'sui.keystore'), 'utf8'),
//         );

//         for (const priv of keystore) {
//             const raw = fromBase64(priv);
//             if (raw[0] !== 0) {
//                 continue;
//             }

//             const pair = Ed25519Keypair.fromSecretKey(raw.slice(1));
//             if (pair.getPublicKey().toSuiAddress() === sender) {
//                 return pair;
//             }
//         }

//         throw new Error(`Keypair not found for sender: ${sender}`);
//     };

//     const getClient = (network: Network) => {
//         return new SuiClient({ url: getFullnodeUrl(network) });
//     };

//     const signAndExecute = async (txb: Transaction, network: Network) => {
//         const client = getClient(network);
//         const signer = getSigner();

//         try {
//             return await client.signAndExecuteTransaction({
//                 transaction: txb,
//                 signer,
//                 options: {
//                     showEffects: true,
//                     showObjectChanges: true,
//                 },
//             });
//         } catch (error) {
//             console.error('Transaction failed:', error);
//         }
//     };

//     const result = await signAndExecute(tx, ACTIVE_NETWORK);
//     if (result) {
//         console.log('Transaction Result:', result);
//     }

// })();
