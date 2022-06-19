import {Avatar, Button, List, Skeleton} from 'antd';
import React, {useEffect, useState} from 'react';
import {useRequestPage} from '~containers/useRequestPage'
import {useQuery} from 'react-query'
import {verifier_get_request} from '~services'
import moment from 'moment'

const RequestPage = () => {
    const {
        handleApprove,
        handleReject

    } = useRequestPage();

    const {data, error, isError, isLoading} = useQuery('requests', verifier_get_request)

    const loadMore =
        isLoading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
            </div>
        ) : null;
    return (
        <section className="w-full md:w-560px lg:w-560px xl:w-560px m-auto relative xs:px-2">
            <div className="flex flex-row justify-between items-center">
                <h1 className={"text-white text-3xl"}>
                    Requests
                </h1>
            </div>
            <div className={"bg-cardBg rounded-2xl p-5 mb-2 mt-5"}>
                <List
                    className="demo-loadmore-list"
                    loading={isLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={data}
                    renderItem={({id, name, gender, dob, ccid}) => (
                        <List.Item
                        >
                            <List.Item.Meta
                                title={<a href="">{name}</a>}
                                description={ccid}
                            />
                            <div className="mr-5">
                                <p>Gender: {gender} </p>
                                <p>DOB: {moment(dob).format('YYYY/MM/DD')} </p>
                            </div>
                            <Button onClick={(event) => handleReject(id)}>Reject</Button>
                            <Button onClick={(event) => handleApprove(id)} type="primary">Approve</Button>
                        </List.Item>
                    )}
                />
            </div>
        </section>

    );
};

export default RequestPage;
