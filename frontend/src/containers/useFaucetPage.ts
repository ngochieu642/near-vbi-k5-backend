import { useState } from "react";
import {login, wallet} from '~utils/near';
import {faucet, faucetContract} from "~utils/faucet-contract";

export const useFaucetPage = () => {
    const [faucetInfo, setFaucetInfo] = useState(
        {
            totalBalanceShare: 0,
            totalShared: 0,
            totalAccountShared: 0,
            maxSharePerAccount: 0,
            isPaused: false
        }
    );
    const [faucetValue, setFaucetValue] = useState(0);
    const [accountBalanceShare, setAccountBalanceShare] = useState(0);
    const [faucetLoading, setFaucetLoading] = useState(false);

    const getFaucetInfo = async () => {
        //@ts-ignore
        let faucetInfo = await faucetContract.get_faucet_info();

        setFaucetInfo({
            totalBalanceShare: parseInt(faucetInfo.total_balance_share),
            totalShared: parseInt(faucetInfo.total_shared),
            totalAccountShared: parseInt(faucetInfo.total_account_shared),
            maxSharePerAccount: parseInt(faucetInfo.max_share_per_account),
            isPaused: faucetInfo.is_paused
        })
    }

    const getAccountBalanceShare = async () => {
        //@ts-ignore
        let balance: string = await faucetContract.get_shared_balance_of({account_id: wallet.getAccountId()});
        setAccountBalanceShare(parseInt(balance));
    }

    const refreshData = () => {
        Promise.all([
            getFaucetInfo(),
            getAccountBalanceShare()
        ]).catch(e => {
            console.log("Error", e);

        })
    }

    const handleMaxButton = () => {
        let currentShared = accountBalanceShare;
        let maxSharePerAccount = faucetInfo.maxSharePerAccount;

        setFaucetValue(maxSharePerAccount - currentShared);
    }

    const isDisable = () => {
        let currentShared = accountBalanceShare;
        let maxSharePerAccount = faucetInfo.maxSharePerAccount;
        let totalBalance = faucetInfo.totalBalanceShare;

        return !wallet.isSignedIn() || !faucetValue || totalBalance == 0 || totalBalance <= faucetValue || currentShared == maxSharePerAccount || currentShared + faucetValue > maxSharePerAccount;
    }

    const handleFaucet = async () => {
        if (!wallet.isSignedIn()) await login();
        if (isDisable()) return;
        setFaucetLoading(true);
        try {
            // @ts-ignore
            await faucet(faucetValue.toString());
        } catch (e) {
            console.log("Error", e);
        } finally {
            setFaucetLoading(false);
        }
    }


    return {
        handleFaucet,
        handleMaxButton,
        getAccountBalanceShare,
        refreshData,
        getFaucetInfo,
        setFaucetValue,
        isDisable,
        faucetInfo,
        faucetValue,
        accountBalanceShare,
        faucetLoading,
    }
}
