import { Contract } from "near-api-js";
import {
    wallet,
    config,
    Transaction,
    executeMultipleTransactions, FT_STORAGE_AMOUNT
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
