import {login, wallet } from "~utils/near";
import {stakeToken, unstake, withdraw, stakingContract, harvest} from "~utils/staking-contract";
import {useState} from 'react'

export const useStakingPage = () => {
    const [balance, setBalance] = useState(0);
    const [tabValue, setTabValue] = useState("stake");
    const [stakeValue, setStakeValue] = useState(0);
    const [unstakeValue, setUnstakeValue] = useState(0);
    const [stakingAccount, setStakingAccount] = useState({
        accountId: "",
        canWithdraw: true,
        reward: 0,
        stakeBalance: 0,
        startUnstakeTimestamp: 0,
        unstakeBalance: 0,
    });

    const [stakeLoading, setStakeLoading] = useState(false);
    const [unstakeLoading, setUnstakeLoading] = useState(false);
    const [claimLoading, setClaimLoading] = useState(false);
    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [poolInfo, setPoolInfo] = useState({
        totalStakeBalance: 0,
        totalReward: 0,
        totalStaker: 0,
        isPaused: Boolean
    })

    const options = [
        { label: 'Stake', value: 'stake' },
        { label: 'Unstake', value: 'unstake' }
    ];

    const getBalance = async () => {
        let balance = "0";
        if (wallet.isSignedIn()) {
            //@ts-ignore
            balance = await ftContract.ft_balance_of({account_id: wallet.getAccountId()});
        }

        setBalance(+balance)
    }

    const getPoolInfo = async () => {
        //@ts-ignore
        let poolInfo: any = await stakingContract.get_pool_info();
        setPoolInfo({
            totalStakeBalance: parseInt(poolInfo.total_stake_balance),
            totalReward: parseInt(poolInfo.total_reward),
            totalStaker: parseInt(poolInfo.total_stakers),
            isPaused: poolInfo.is_paused
        })
    }

    const getStakingAccountInfo = async () => {
        if (wallet.isSignedIn()) {
            //@ts-ignore
            let rawData = await stakingContract.get_account_info({account_id: wallet.getAccountId()});

            let data = {
                accountId: wallet.getAccountId(),
                canWithdraw: rawData.can_withdraw,
                stakeBalance: parseInt(rawData.stake_balance),
                unstakeBalance: parseInt(rawData.unstake_balance),
                reward: parseInt(rawData.reward),
                startUnstakeTimestamp: parseInt(rawData.unstake_start_timestamp)
            };
            setStakingAccount(data);
        }
    }

    const refreshData = () => {
        Promise.all([
            getBalance(),
            getStakingAccountInfo(),
            getPoolInfo()
        ]).catch(e => {

        })
    }

    const handleStakeToken = async () => {
        if (!wallet.isSignedIn()) await login();
        if (!stakeValue || stakeValue <= 0 || stakeValue > balance) return;
        setStakeLoading(true);
        try {
            await stakeToken(stakeValue.toString())
        } catch (e) {
            console.log("Error", e);
        } finally {
            setStakeLoading(false);
        }
    }

    const handleUnstakeToken = async () => {
        if (!wallet.isSignedIn()) await login();
        if (!unstakeValue || unstakeValue <= 0 || unstakeValue > stakingAccount.stakeBalance) return;
        setUnstakeLoading(true);
        try {
            await unstake(unstakeValue.toString());
        } catch (e) {
            console.log("Error", e);
        } finally {
            setUnstakeLoading(false);
        }
    }

    const handleClaimReward = async () => {
        if (!wallet.isSignedIn()) await login();
        if (stakingAccount.reward < 1) return;
        setClaimLoading(true);
        try {
            await harvest();
        } catch (e) {
            console.log("Error", e);
        } finally {
            setClaimLoading(false);
        }
    }

    const handleWithdraw = async () => {
        if (!wallet.isSignedIn()) await login();
        if (!stakingAccount.canWithdraw || stakingAccount.unstakeBalance == 0) return;
        setWithdrawLoading(true);
        try {
            await withdraw();
        } catch (e) {
            console.log("Error", e);
        } finally {
            setWithdrawLoading(false);
        }
    }

    return {
        handleWithdraw,
        handleClaimReward,
        handleUnstakeToken,
        handleStakeToken,
        refreshData,
        getStakingAccountInfo,
        getPoolInfo,
        getBalance,
        setTabValue,
        setStakeValue,
        setUnstakeValue,
        options,
        poolInfo,
        withdrawLoading,
        claimLoading,
        unstakeLoading,
        stakeLoading,
        tabValue,
        stakingAccount,
        balance,
        stakeValue,
        unstakeValue,
    }
}
