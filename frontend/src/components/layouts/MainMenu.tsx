import {Button, Checkbox, Form, Input, Modal} from 'antd';
import React, {useState} from 'react';
import {useLoginModal} from '~containers/useLoginModal'
import {useForgotPass} from '~containers/useForgotPass'
import {useLayout} from '~containers/useLayout'
import {useSelector} from 'react-redux'
import {RootState} from '~store/store'
import {ROLE} from '~common/enum/login'
import {Link, matchPath} from 'react-router-dom'

const isSelected = (pattern: string) => {
    return matchPath(location.pathname, {exact: true, strict: false, path: pattern})
};

function UserMenu() {
    return (
        <ul className={"flex flex-row justify-center items-center mb-0"}>
            <li>
                <Link
                    className={`p-4 text-lg ${isSelected("/") ? "border-b-2 border-greenColor text-greenColor" : "hover:border-b-2 hover:border-greenColor hover:text-greenColor"} text-gray-400 cursor-pointer`}
                    to={"/"}>Home
                </Link>
            </li>
            <li>
                <Link
                    className={`p-4 text-lg ${isSelected("/requests") ? "border-b-2 border-greenColor text-greenColor" : "hover:border-b-2 hover:border-greenColor hover:text-greenColor"} text-gray-400 cursor-pointer`}
                    to={"/requests"}>Requests</Link>
            </li>
            <li>
                <Link
                    className={`p-4 text-lg ${isSelected("/Certificates") ? "border-b-2 border-greenColor text-greenColor" : "hover:border-b-2 hover:border-greenColor hover:text-greenColor"} text-gray-400 cursor-pointer`}
                    to={"/certificates"}>Certificates</Link>
            </li>
        </ul>

    );
}

function VerifierMenu() {
    return (
        <ul className={"flex flex-row justify-center items-center mb-0"}>
            <li>
                <Link
                    className={`p-4 text-lg ${isSelected("/requests") ? "border-b-2 border-greenColor text-greenColor" : "hover:border-b-2 hover:border-greenColor hover:text-greenColor"} text-gray-400 cursor-pointer`}
                    to={"/requests"}>Requests</Link>
            </li>
        </ul>
    );
}

function CompanyMenu() {
    return (
        <ul className={"flex flex-row justify-center items-center mb-0"}>
            <li>
                <Link
                    className={`p-4 text-lg ${isSelected("/requests") ? "border-b-2 border-greenColor text-greenColor" : "hover:border-b-2 hover:border-greenColor hover:text-greenColor"} text-gray-400 cursor-pointer`}
                    to={"/requests"}>Requests</Link>
            </li>
        </ul>
    );
}

export const MainMenu = () => {
    const role = useSelector((state: RootState) => state.common.role)

    if (role === ROLE.Customer) {
        return <UserMenu />;
    }
    if (role === ROLE.Verifier) {
        return <VerifierMenu/>
    }
    return <CompanyMenu />;
}
