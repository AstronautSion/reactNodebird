import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Menu, Input, Button, Row, Col } from 'antd';
import LoginForm from '../components/LoginForm';
import UserProfile from './UserProfile';
import { useSelector } from 'react-redux';

const AppLayout = ({ children }) =>{
    const { isLoggedIn } = useSelector(state => state.user);
    
    return(
        <div className="wrap">
            
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>Home</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }}/>
                </Menu.Item>
            </Menu>
            { !isLoggedIn && <Link href="/signup"><a><Button>Sign up</Button></a></Link>}
            <Row gutter={10}>
                <Col xs={24} md={6}>
                    { isLoggedIn ? <UserProfile /> : <LoginForm /> }
                </Col> 
                
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <Link href="#"><a target="_blank">Made by Astronaut.sion</a></Link>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node,
};

export default AppLayout;