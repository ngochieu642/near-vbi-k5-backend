import { Avatar, Button, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import {useRequestPage} from '~containers/useRequestPage'

const RequestPage = () => {
    const {
        initLoading,
        loading,
        list,
        fetchData,
        onLoadMore
    } = useRequestPage();


    useEffect(() => {
        fetchData()
    }, []);

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
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
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={(item) => (
                        <List.Item
                            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large} />}
                                    title={<a href="https://ant.design">{item.name?.last}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                                <div>content</div>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>
        </section>

    );
};

export default RequestPage;
