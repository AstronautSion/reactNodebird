import React from 'react';
import { Button, List, Card, Icon } from 'antd';
import NicknameEditForm from '../components/NicknameEditForm.js';

const Profile = () =>{
    return(
        <>
            <NicknameEditForm />
           
            <List
                style={{marginBottom:'20px'}}
                grid={{ gutter:4, xs:2, md:3 }}
                size="smail"
                header={<div>팔로워 목록</div>}
                loadMore={<Button style={{ width: '100%'}}>더 보기</Button>}
                bordered
                dataSource={['검냥', '메롱', '우주인입니다']}
                renderItem={item=>(
                    <List.Item style={{ marginTop : '20px'}}>
                        <Card actions={[<Icon key="stop" type="stop" />]}><Card.Meta description={item} /></Card>
                    </List.Item>
                )}
            />

            <List
                style={{marginBottom:'20px'}}
                grid={{ gutter:4, xs:2, md:3 }}
                size="smail"
                header={<div>팔로잉 목록</div>}
                loadMore={<Button style={{ width: '100%'}}>더 보기</Button>}
                bordered
                dataSource={['제로초', '바보', '노드버드오피셜']}
                renderItem={item=>(
                    <List.Item style={{ marginTop : '20px'}}>
                        <Card actions={[<Icon key="stop" type="stop" />]}><Card.Meta description={item} /></Card>
                    </List.Item>
                )}
            />
        </>
        
    );
};

export default Profile;