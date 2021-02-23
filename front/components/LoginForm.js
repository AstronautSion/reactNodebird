import React, { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';

const LoginForm = () =>{
    const [userId , onChangeUserId ] = useInput('');
    const [password, onPassword] = useInput('');
    const { me } = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const onSubmitForm = useCallback((e) =>{
        e.preventDefault();
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                userId,
                password
            }
        });
    },[userId, password]);
 
    return(
        <>
            <Form onSubmit={onSubmitForm} style={{ padding: '10px' }}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={userId} required onChange={onChangeUserId} />
                </div> 
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" value={password} required onChange={onPassword} type="password" />
                </div> 
                <div>
                    <Button type="primary" htmlType="submit" loading={me}>로그인</Button>
                    <Link href="/signup"><a><Button>회원가입</Button></a></Link>
                </div>
            </Form>
        </>
    );
};

export default LoginForm;