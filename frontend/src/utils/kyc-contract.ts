import { Contract } from "near-api-js";
import {
    wallet,
    config,
    Transaction,
    executeMultipleTransactions, FT_STORAGE_AMOUNT, ONE_YOCTO_NEAR
} from "~utils/near";
import ftContract from "~utils/ft-contract";

const kycContract = new Contract(
    wallet.account(),
    config.VBI_KYC_CONTRACT,
    {
        viewMethods: ["get_hash"],
        changeMethods: ["update_hash"]
    }
)

const kyc = async (key: string, hash: string) => {
    // Execute multi transaction: 1. deposit staking storage, 2. ft transfer call
    let updateHash: Transaction = {
        receiverId: config.VBI_KYC_CONTRACT,
        functionCalls: [
            {
                methodName: "update_hash",
                args: {
                    key,
                    hash
                },
                gas: "10000000000000",
                amount: FT_STORAGE_AMOUNT
            }
        ]
    }

    let transactions: Transaction[] = [updateHash];
    await executeMultipleTransactions(transactions);
}

export {
    kycContract,
    kyc
}
