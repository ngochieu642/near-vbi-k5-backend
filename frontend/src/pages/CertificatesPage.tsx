import {Avatar, Button, List, Skeleton, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import {StarOutlined, LikeOutlined, MessageOutlined} from '@ant-design/icons';
import {useCertificatesPage} from '~containers/useCertificatesPage'

const CertificatesPage = () => {
    const {
        data
    } = useCertificatesPage();

    const IconText = ({icon, text}: { icon: React.FC; text: string }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <section className="w-full md:w-560px lg:w-560px xl:w-560px m-auto relative xs:px-2">
            <div className="flex flex-row justify-between items-center">
                <h1 className={"text-white text-3xl"}>
                    Requests
                </h1>
            </div>
            <div className={"bg-cardBg rounded-2xl p-5 mb-2 mt-5"}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={data}
                    footer={
                        <div>
                            <b>ant design</b> footer part
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar}/>}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </div>
        </section>

    );
};
export default CertificatesPage;
