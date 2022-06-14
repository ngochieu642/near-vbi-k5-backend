import React, {useEffect, useState} from "react";
import {IntervalSpinner} from "~components/spiner/IntervalSpinner";
import {formatNumber, login, parseTokenAmount, parseTokenWithDecimals, wallet} from "~utils/near";
import {getTokenMetadata} from "~utils/token";
import {InputNumber} from "antd";
import {MyButton, MaxButton} from "~components/button";
import {CreditCardOutlined} from "@ant-design/icons";
import {useFaucetPage} from '~containers/useFaucetPage'

const FaucetPage = () => {
    const {
        refreshData,
        handleMaxButton,
        setFaucetValue,
        handleFaucet,
        isDisable,
        accountBalanceShare,
        faucetInfo,
        faucetValue,
        faucetLoading,
    } = useFaucetPage();

    useEffect(() => {
        refreshData()
    }, [wallet.getAccountId(), wallet.isSignedIn()]);

    return (
        <div className="staking w-full">
            <section className="w-full md:w-560px lg:w-560px xl:w-560px m-auto relative xs:px-2">
                <div className="flex flex-row justify-between items-center">
                    <h1 className={"text-white text-3xl"}>
                        Faucet
                    </h1>
                    <IntervalSpinner onProgressSuccess={refreshData}/>
                </div>
                <div className={"flex flex-col mt-5 justify-between"}>
                    <div className={"flex flex-row justify-between mb-2 bg-cardBg rounded-2xl p-5 w-full"}>
                        <p className={"text-base text-primaryText"}>Faucet Balance</p>
                        <p className={"text-2xl text-white"}>{faucetInfo.totalBalanceShare} LINE</p>
                    </div>
                </div>
                <div className={"bg-cardBg rounded-2xl p-5 mb-2"}>
                    <div className={"input-form mt-5"}>
                        <p className="flex flex-row items-center text-primaryText mb-2">
                            <CreditCardOutlined/>
                            <span className="text-primaryText mr-2 ml-1">Shared balance:</span>
                            {accountBalanceShare}
                            <img className="mr-1 ml-2" style={{width: 15, height: 15}}
                                 src={getTokenMetadata("LINE").icon} alt=""/><span className="text-primary">LINE</span>
                        </p>
                        <InputNumber min={0} className={"staking-input font-bold mb-4 rounded"}
                                     addonAfter={<MaxButton onClick={handleMaxButton}/>} value={faucetValue}
                                     onChange={(value) => setFaucetValue(value)} defaultValue={0}/>

                        <p className="text-xs text-primaryText mb-1">
                            {
                                accountBalanceShare == faucetInfo.maxSharePerAccount ?
                                    <span>One account can get max {faucetInfo.maxSharePerAccount} LINE. You can not get more!</span>
                                    : <span>One account can get max {faucetInfo.maxSharePerAccount} LINE. You can get more!</span>
                            }
                        </p>
                        <MyButton onClick={handleFaucet} loading={faucetLoading} disable={isDisable()}
                                  text="Claim token"/>
                    </div>
                </div>
                <div className="w-full grid mt-3 grid-cols-2 lg:grid-rows-2 gap-2">
                    <div
                        className="lg:h-16 xs:h-20 md:h-20 rounded-lg bg-darkGradientBg shadow-dark p-2.5 hover:bg-darkGradientHoverBg">
                        <div className="text-primaryText text-xs mb-1 xs:h-8 md:h-8 lg:text-center">
                            Number of Unique Accounts
                        </div>
                        <div className="lg:flex lg:justify-center lg:items-center">
                            <label
                                className="text-base font-medium text-xREFColor">{faucetInfo.totalAccountShared}</label>
                            <label className="text-xs ml-1.5 text-primaryText">Accounts</label>
                        </div>
                    </div>
                    <div
                        className="lg:h-16 xs:h-20 md:h-20 rounded-lg bg-darkGradientBg shadow-dark p-2.5 hover:bg-darkGradientHoverBg">
                        <div className="text-primaryText text-xs mb-1 xs:h-8 md:h-8 lg:text-center">
                            Total LINE Shared
                        </div>
                        <div className="lg:flex lg:justify-center lg:items-center">
                            <label className="text-base font-medium text-xREFColor">{faucetInfo.totalShared}</label>
                            <label className="text-xs ml-1.5 text-primaryText">LINE</label>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FaucetPage;
